'use client';

import { useMeUserQuery } from '@entities/user';

import { Button } from '@shared/ui';

export function WorkspacesHeaderProfileButton() {
    const { data: meUser } = useMeUserQuery({ enabled: true });
    const profileText = meUser?.nickname?.trim().slice(0, 1) || 'U';

    return (
        <Button
            rounded="full"
            size="sm"
            variant="light-blue"
            className="aspect-square size-9 shrink-0 p-0 text-sm leading-none"
            aria-label={meUser?.nickname || 'Profile'}
            shadow={false}
        >
            {profileText}
        </Button>
    );
}
