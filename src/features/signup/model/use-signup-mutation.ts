'use client';

import { signupMutationKeys } from './signup-mutation-keys';
import { useMutation } from '@tanstack/react-query';

import { joinUser } from '@entities/user';

import type { JoinUserRequest } from '@entities/user';

export function useSignupMutation() {
    return useMutation({
        mutationKey: signupMutationKeys.join(),
        mutationFn: (body: JoinUserRequest) => joinUser(body),
    });
}
