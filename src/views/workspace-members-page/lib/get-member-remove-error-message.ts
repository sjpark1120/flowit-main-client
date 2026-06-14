import { getApiErrorCode, getApiErrorMessage } from '@shared/api';

import { isMemberRemoveErrorCode } from '../model/member-remove-error-codes';

import type { MemberRemoveErrorCode } from '../model/member-remove-error-codes';

type GetMemberRemoveErrorMessageParams = {
    error: unknown;
    fallback: string;
    unknownError: string;
    getKnownErrorMessage: (errorCode: MemberRemoveErrorCode) => string;
};

export function getMemberRemoveErrorMessage({
    error,
    fallback,
    unknownError,
    getKnownErrorMessage,
}: GetMemberRemoveErrorMessageParams) {
    const errorCode = getApiErrorCode(error);

    if (!errorCode) {
        return getApiErrorMessage(error, fallback);
    }

    if (isMemberRemoveErrorCode(errorCode)) {
        return getKnownErrorMessage(errorCode);
    }

    return unknownError;
}
