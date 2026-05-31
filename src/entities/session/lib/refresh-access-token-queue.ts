'use client';

import { setRefreshAccessTokenHandler } from '@shared/lib/auth';

import { refreshAccessToken } from '../api/refresh-access-token';

let refreshPromise: Promise<string | null> | null = null;

export function queueRefreshAccessToken() {
    if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
}

setRefreshAccessTokenHandler(queueRefreshAccessToken);
