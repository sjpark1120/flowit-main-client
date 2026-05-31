'use client';

import { AuthGuard } from './auth-guard';
import { QueryProvider } from './query-provider';
import { NextIntlClientProvider } from 'next-intl';

import type { AbstractIntlMessages } from 'next-intl';

type AppProvidersProps = {
    children: React.ReactNode;
    messages: AbstractIntlMessages;
    locale: string;
};

export function AppProviders({ children, messages, locale }: AppProvidersProps) {
    return (
        <QueryProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
                <AuthGuard>{children}</AuthGuard>
            </NextIntlClientProvider>
        </QueryProvider>
    );
}
