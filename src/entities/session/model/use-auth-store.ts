'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { setAccessTokenProvider } from '@shared/lib/auth';

type AuthState = {
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
    setAuth: (tokens: { accessToken: string }) => void;
    clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
    devtools(
        set => ({
            accessToken: null,
            setAccessToken: accessToken => set({ accessToken }, false, 'auth/setAccessToken'),
            setAuth: ({ accessToken }) => set({ accessToken }, false, 'auth/setAuth'),
            clearAuth: () => set({ accessToken: null }, false, 'auth/clearAuth'),
        }),
        { name: 'auth-store' },
    ),
);

setAccessTokenProvider(() => useAuthStore.getState().accessToken);
