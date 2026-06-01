import createMiddleware from 'next-intl/middleware';

import { routing } from './shared/i18n/routing';

import type { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
    return handleI18nRouting(request);
}

export const config = {
    // /v1/* 는 API rewrite 대상 — next-intl 이 /ko/v1/... 로 붙이면 안 됨
    matcher: '/((?!api|trpc|_next|_vercel|v1/|.*\\..*).*)',
};
