'use client';

import { meUserMutationKeys } from './me-user-mutation-keys';
import { meUserQueryKeys } from './me-user-query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMeUser } from '../api';

import type { UpdateMeUserRequest } from './update-me-user.types';

export function useUpdateMeUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: meUserMutationKeys.update(),
        mutationFn: (body: UpdateMeUserRequest) => updateMeUser(body),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: meUserQueryKeys.all });
        },
    });
}
