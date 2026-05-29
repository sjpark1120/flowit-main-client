'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@shared/ui/button';
import { Modal } from '@shared/ui/modal';

type SignupSuccessModalProps = {
    open: boolean;
    onConfirm: () => void;
};

export function SignupSuccessModal({ open, onConfirm }: SignupSuccessModalProps) {
    const t = useTranslations('auth');

    return (
        <Modal open={open} title={t('signupSuccessTitle')} description={t('signupSuccessDescription')}>
            <Button fullWidth type="button" className="mt-6" onClick={onConfirm}>
                <span className="font-extrabold">{t('goToLogin')}</span>
            </Button>
        </Modal>
    );
}
