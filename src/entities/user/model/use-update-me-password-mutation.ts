'use client';

import { mePasswordMutationKeys } from './me-password-mutation-keys';
import { useMutation } from '@tanstack/react-query';

import { updateMePassword } from '../api';

import type { UpdateMePasswordRequest } from './update-me-password.types';

export function useUpdateMePasswordMutation() {
    return useMutation({
        mutationKey: mePasswordMutationKeys.update(),
        mutationFn: (body: UpdateMePasswordRequest) => updateMePassword(body),
    });
}
