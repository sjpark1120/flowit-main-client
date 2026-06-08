export const mePasswordMutationKeys = {
    all: ['me-password'] as const,
    update: () => [...mePasswordMutationKeys.all, 'update'] as const,
};
