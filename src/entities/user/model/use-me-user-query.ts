'use client';

import { meUserQueryKeys } from './me-user-query-keys';
import { useQuery } from '@tanstack/react-query';

import { meUser } from '../api';

type UseMeUserQueryProps = {
    enabled?: boolean;
};

export function useMeUserQuery({ enabled = true }: UseMeUserQueryProps) {
    return useQuery({
        queryKey: meUserQueryKeys.detail('me'),
        queryFn: meUser,
        staleTime: 0,
        refetchOnMount: 'always',
        enabled,
    });
}
