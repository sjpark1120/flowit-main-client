export const MEMBER_REMOVE_ERROR_CODES = {
    AUTH_401_001: true,
    AUTH_403_001: true,
    WORKSPACE_404_001: true,
    WORKSPACE_MEMBER_404_001: true,
    INTERNAL_500_001: true,
} as const;

export type MemberRemoveErrorCode = keyof typeof MEMBER_REMOVE_ERROR_CODES;

export function isMemberRemoveErrorCode(code: string): code is MemberRemoveErrorCode {
    return code in MEMBER_REMOVE_ERROR_CODES;
}
