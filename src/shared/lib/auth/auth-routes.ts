import { AUTH_PUBLIC_PATHS } from './constants';

import { routing } from '@shared/i18n/routing';

import type { Locale } from '@shared/i18n/routing';

function isLocale(segment: string): segment is Locale {
    return routing.locales.includes(segment as Locale);
}

export function getPathnameWithoutLocale(pathname: string) {
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length > 0 && isLocale(segments[0])) {
        const rest = segments.slice(1);
        return rest.length === 0 ? '/' : `/${rest.join('/')}`;
    }

    return pathname || '/';
}

export function getLocaleFromPathname(pathname: string) {
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length > 0 && isLocale(segments[0])) {
        return segments[0];
    }

    return routing.defaultLocale;
}

export function isAuthPublicPath(pathname: string) {
    const path = getPathnameWithoutLocale(pathname);

    return AUTH_PUBLIC_PATHS.some(publicPath => path === publicPath || path.startsWith(`${publicPath}/`));
}
