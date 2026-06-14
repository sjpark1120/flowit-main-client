import { getApiErrorCode, getApiErrorMessage } from '@shared/api';

import { isMemberRoleChangeErrorCode } from '../model/member-role-change-error-codes';

import type { MemberRoleChangeErrorCode } from '../model/member-role-change-error-codes';

type GetMemberRoleChangeErrorMessageParams = {
    error: unknown;
    fallback: string;
    unknownError: string;
    getKnownErrorMessage: (errorCode: MemberRoleChangeErrorCode) => string;
};

export function getMemberRoleChangeErrorMessage({
    error,
    fallback,
    unknownError,
    getKnownErrorMessage,
}: GetMemberRoleChangeErrorMessageParams) {
    const errorCode = getApiErrorCode(error);

    if (!errorCode) {
        return getApiErrorMessage(error, fallback);
    }

    if (isMemberRoleChangeErrorCode(errorCode)) {
        return getKnownErrorMessage(errorCode);
    }

    return unknownError;
}
