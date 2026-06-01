'use client';

import { apiRequest } from '@shared/api/http';

import { saveAccessToken } from '../lib/save-auth-tokens';

import type { AuthTokens } from '../model/auth.types';

const REFRESH_ACCESS_TOKEN_PATH = '/v1/public/auth/refresh';

export async function refreshAccessToken() {
    try {
        const data = await apiRequest<AuthTokens>(REFRESH_ACCESS_TOKEN_PATH, {
            method: 'POST',
            skipAuth: true,
        });

        saveAccessToken({ accessToken: data.accessToken });
        return data.accessToken;
    } catch {
        return null;
    }
}
