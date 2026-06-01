import { apiRequest } from '@shared/api/http';

import type { JoinUserData, JoinUserRequest } from '../model/join-user.types';

const JOIN_USER_PATH = '/v1/public/users/join';

export function joinUser(body: JoinUserRequest) {
    return apiRequest<JoinUserData>(JOIN_USER_PATH, {
        method: 'POST',
        body,
        skipAuth: true,
    });
}
