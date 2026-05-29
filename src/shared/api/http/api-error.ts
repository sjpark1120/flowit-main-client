import { isApiErrorResponse } from './parse-api-error';

export class ApiError extends Error {
    readonly status: number;
    readonly body: unknown;
    readonly code?: string;

    constructor(message: string, status: number, body: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.body = body;

        if (isApiErrorResponse(body)) {
            this.code = body.error.code;
        }
    }
}
