'use client';

import { meProfileImageQueryKeys } from './me-profile-image-query-keys';
import { useQuery } from '@tanstack/react-query';

import { meProfileImage } from '../api';

type UseMeProfileImageQueryProps = {
    profileImageFileId?: number | null;
    enabled?: boolean;
};

export function useMeProfileImageQuery({ profileImageFileId, enabled = true }: UseMeProfileImageQueryProps) {
    const hasProfileImage = profileImageFileId !== null;

    return useQuery({
        queryKey: meProfileImageQueryKeys.detail(profileImageFileId ?? 'none'),
        queryFn: meProfileImage,
        enabled: enabled && hasProfileImage,
        staleTime: Infinity,
    });
}
