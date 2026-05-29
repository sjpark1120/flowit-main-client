export const signupMutationKeys = {
    all: ['signup'] as const,
    join: () => [...signupMutationKeys.all, 'join'] as const,
};
