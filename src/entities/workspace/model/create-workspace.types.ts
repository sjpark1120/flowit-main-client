export type CreateWorkspaceRequest = {
    name: string;
    description?: string;
};

export type CreateWorkspaceResponse = {
    createdId: number;
};
