'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { useUpdateMeUserMutation } from '@entities/user';

import { Button, LabeledInput, Modal } from '@shared/ui';
import { getApiErrorMessage } from '@shared/api';
import { isValidName, MAX_DEFAULT_LENGTH } from '@shared/lib';

import type { FormEvent } from 'react';

const PROFILE_EDIT_FORM_ID = 'profile-edit-form';

type ProfileEditModalProps = {
    open: boolean;
    initialNickname: string;
    onClose: () => void;
};

export function ProfileEditModal({ open, initialNickname, onClose }: ProfileEditModalProps) {
    const t = useTranslations('myPage');
    const tAuth = useTranslations('auth');
    const commonT = useTranslations('common');

    const { mutate: updateMeUserMutate, isPending: isUpdatingMeUser, error } = useUpdateMeUserMutation();
    const [draftNickname, setDraftNickname] = useState<string | null>(null);

    const nicknameInputValue = draftNickname ?? initialNickname;

    const handleClose = () => {
        setDraftNickname(null);
        onClose();
    };

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidName(nicknameInputValue)) {
            return;
        }

        updateMeUserMutate(
            { nickname: nicknameInputValue.trim() },
            {
                onSuccess: () => {
                    handleClose();
                },
            },
        );
    };

    const isNicknameError = nicknameInputValue.length > 0 && !isValidName(nicknameInputValue);
    const isSaveDisabled = isUpdatingMeUser || !isValidName(nicknameInputValue);
    const submitErrorMessage = error ? getApiErrorMessage(error, t('profileUpdateFailed')) : null;

    return (
        <Modal
            open={open}
            title={t('profileEdit')}
            onClose={handleClose}
            footer={
                <div className="flex w-full gap-3">
                    <Button variant="neutral" size="sm" fullWidth className="font-bold" onClick={handleClose}>
                        {commonT('cancel')}
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        className="font-bold"
                        disabled={isSaveDisabled}
                        type="submit"
                        form={PROFILE_EDIT_FORM_ID}
                    >
                        {isUpdatingMeUser ? t('profileUpdating') : commonT('save')}
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-2">
                <form id={PROFILE_EDIT_FORM_ID} onSubmit={handleSave}>
                    <LabeledInput
                        name="nickname"
                        label={tAuth('name')}
                        errorMessage={tAuth('enterName')}
                        isError={isNicknameError}
                        value={nicknameInputValue}
                        maxLength={MAX_DEFAULT_LENGTH}
                        aria-invalid={isNicknameError}
                        onChange={e => setDraftNickname(e.target.value)}
                    />
                </form>
                {submitErrorMessage && <p className="text-xs font-bold text-rose-500">{submitErrorMessage}</p>}
            </div>
        </Modal>
    );
}
