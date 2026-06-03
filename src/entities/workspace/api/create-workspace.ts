import { apiRequest } from '@shared/api/http';

import type { CreateWorkspaceRequest, CreateWorkspaceResponse } from '../model/create-workspace.types';

const CREATE_WORKSPACE_PATH = '/v1/workspaces';

export function createWorkspace(body: CreateWorkspaceRequest) {
    return apiRequest<CreateWorkspaceResponse>(CREATE_WORKSPACE_PATH, {
        method: 'POST',
        body,
    });
}
