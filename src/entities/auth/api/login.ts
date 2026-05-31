import { apiRequest } from '@shared/api/http';

import type { LoginRequest, LoginResponse } from '../model/login.types';

const LOGIN_PATH = '/v1/public/auth/login';

export function login(body: LoginRequest) {
    return apiRequest<LoginResponse>(LOGIN_PATH, {
        method: 'POST',
        body,
        skipAuth: true,
    });
}
