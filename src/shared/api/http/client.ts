import { ApiError } from './api-error';
import { isApiErrorResponse, isApiSuccessResponse } from './parse-api-error';

import { getAccessToken, refreshAccessTokenFromProvider } from '@shared/lib/auth';

type RequestOptions = Omit<RequestInit, 'body'> & {
    body?: unknown;
    skipAuth?: boolean;
    isRetry?: boolean;
};

function buildAuthHeaders(skipAuth?: boolean): Record<string, string> {
    if (skipAuth) {
        return {};
    }

    const accessToken = getAccessToken();

    if (!accessToken) {
        return {};
    }

    return {
        Authorization: `Bearer ${accessToken}`,
    };
}

async function executeRequest<TData>(path: string, options: RequestOptions): Promise<TData> {
    const { body, headers, skipAuth, ...rest } = options;

    let response: Response;

    try {
        response = await fetch(path, {
            ...rest,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...buildAuthHeaders(skipAuth),
                ...headers,
            },
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    } catch (cause) {
        const message = cause instanceof Error ? cause.message : 'Network request failed';

        throw new ApiError(message, 0, null);
    }

    const responseBody: unknown = await response.json().catch(() => null);

    if (!response.ok) {
        const message = isApiErrorResponse(responseBody) ? responseBody.error.message : 'API request failed';

        throw new ApiError(message, response.status, responseBody);
    }

    if (!isApiSuccessResponse<TData>(responseBody)) {
        throw new ApiError('Invalid API response', response.status, responseBody);
    }

    return responseBody.data;
}

export async function apiRequest<TData>(path: string, options: RequestOptions = {}): Promise<TData> {
    const { isRetry, skipAuth, ...requestOptions } = options;

    try {
        return await executeRequest<TData>(path, { ...requestOptions, skipAuth, isRetry });
    } catch (error) {
        const shouldRefresh = error instanceof ApiError && error.status === 401 && !skipAuth && !isRetry;

        if (!shouldRefresh) {
            throw error;
        }

        const accessToken = await refreshAccessTokenFromProvider();

        if (!accessToken) {
            throw error;
        }

        return apiRequest<TData>(path, {
            ...requestOptions,
            skipAuth,
            isRetry: true,
        });
    }
}
