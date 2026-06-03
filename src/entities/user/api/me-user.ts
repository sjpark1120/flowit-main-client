import { apiRequest } from '@shared/api/http';

import type { MeUserResponse } from '@entities/user/model/me-user.types';

const ME_USER_PATH = '/v1/users/me';

export function meUser() {
    return apiRequest<MeUserResponse>(ME_USER_PATH, {
        method: 'GET',
    });
}
