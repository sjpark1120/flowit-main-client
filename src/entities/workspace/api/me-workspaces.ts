import { apiRequest } from '@shared/api/http';

import type { MeWorkspaceResponse } from '../model/me-workspace.types';

const ME_WORKSPACES_PATH = '/v1/users/me/workspaces';

export function meWorkspaces() {
    return apiRequest<MeWorkspaceResponse>(ME_WORKSPACES_PATH, {
        method: 'GET',
    });
}
