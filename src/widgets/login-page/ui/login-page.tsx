import Image from 'next/image';

import { LoginForm } from './login-form';
import { getTranslations } from 'next-intl/server';

import { Link } from '@shared/i18n';
import { Card } from '@shared/ui';

export async function LoginPage() {
    const t = await getTranslations('auth');

    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <div className="absolute top-[100px] left-[100px] h-[350px] w-[350px] rounded-full bg-indigo-300/30 mix-blend-multiply blur-[80px]" />

            <Card className="flex w-100 flex-col items-center">
                <Image className="mb-5" src="/images/flowit-logo.png" alt={t('Logo alt')} width={100} height={100} />
                <div className="mb-5 flex flex-col gap-2">
                    <h1 className="text-center text-xl font-bold text-slate-900">{t('Welcome back')}</h1>
                    <p className="text-center text-sm font-bold text-slate-500">{t('Welcome back description')}</p>
                </div>
                <LoginForm />
                <div className="mt-7 flex gap-1">
                    <p className="text-center text-sm font-semibold text-slate-500">{t('No account?')}</p>
                    <Link href="/signup" className="text-center text-sm font-bold text-blue-600 hover:underline">
                        {t('Sign up')}
                    </Link>
                </div>
            </Card>
            <div className="mt-4 flex gap-3 text-sm text-slate-600">
                <Link href="/login" locale="ko">
                    한국어
                </Link>
                <Link href="/login" locale="en">
                    English
                </Link>
            </div>
        </div>
    );
}
