export const meUserMutationKeys = {
    all: ['me-user'] as const,
    update: () => [...meUserMutationKeys.all, 'update'] as const,
};
