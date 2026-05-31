'use client';

import { loginMutationKeys } from './login-mutation-keys';
import { useMutation } from '@tanstack/react-query';

import { login } from '@entities/auth';
import { saveAccessToken } from '@entities/session';

import type { LoginRequest } from '@entities/auth';

export function useLoginMutation() {
    return useMutation({
        mutationKey: loginMutationKeys.login(),
        mutationFn: (body: LoginRequest) => login(body),
        onSuccess: data => {
            saveAccessToken({ accessToken: data.accessToken });
        },
    });
}
