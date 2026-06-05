'use client';

import { useMeUserQuery } from '@entities/user';

export function MeUserPrefetch() {
    useMeUserQuery({ enabled: true });
    return null;
}
