export const meProfileImageMutationKeys = {
    all: ['me-profile-image'] as const,
    update: () => [...meProfileImageMutationKeys.all, 'update'] as const,
};
