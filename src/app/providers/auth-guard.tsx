'use client';

import { useEffect, useState } from 'react';

import { queueRefreshAccessToken, useAuthStore } from '@entities/session';

import { usePathname, useRouter } from '@shared/i18n';
import { isAuthPublicPath } from '@shared/lib/auth';

type AuthGuardProps = {
    children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
    const pathname = usePathname();
    const router = useRouter();
    const accessToken = useAuthStore(state => state.accessToken);
    const isPublicPath = isAuthPublicPath(pathname);
    const [sessionReadyPath, setSessionReadyPath] = useState<string | null>(null);
    const isSessionReady = isPublicPath || sessionReadyPath === pathname;

    useEffect(() => {
        if (isPublicPath) {
            return;
        }

        let isCancelled = false;

        const initializeSession = async () => {
            const existingAccessToken = useAuthStore.getState().accessToken;

            if (existingAccessToken) {
                if (!isCancelled) {
                    setSessionReadyPath(pathname);
                }

                return;
            }

            const refreshedAccessToken = await queueRefreshAccessToken();

            if (!refreshedAccessToken && !isCancelled) {
                router.replace('/login');
                return;
            }

            if (isCancelled) {
                return;
            }

            setSessionReadyPath(pathname);
        };

        initializeSession();

        return () => {
            isCancelled = true;
        };
    }, [isPublicPath, pathname, router]);

    useEffect(() => {
        if (!isSessionReady || isPublicPath) {
            return;
        }

        if (!accessToken) {
            router.replace('/login');
        }
    }, [accessToken, isPublicPath, isSessionReady, router]);

    if (!isSessionReady && !isPublicPath) {
        return null;
    }

    return children;
}
