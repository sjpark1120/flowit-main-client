export const MEMBER_ROLE_CHANGE_ERROR_CODES = {
    VALIDATION_400_001: true,
    AUTH_401_001: true,
    AUTH_403_001: true,
    WORKSPACE_404_001: true,
    WORKSPACE_MEMBER_404_001: true,
    INTERNAL_500_001: true,
} as const;

export type MemberRoleChangeErrorCode = keyof typeof MEMBER_ROLE_CHANGE_ERROR_CODES;

export function isMemberRoleChangeErrorCode(code: string): code is MemberRoleChangeErrorCode {
    return code in MEMBER_ROLE_CHANGE_ERROR_CODES;
}
