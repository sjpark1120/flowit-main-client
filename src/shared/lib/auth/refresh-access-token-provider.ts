type RefreshAccessTokenHandler = () => Promise<string | null>;

let refreshAccessTokenHandler: RefreshAccessTokenHandler = () => Promise.resolve(null);

export function setRefreshAccessTokenHandler(handler: RefreshAccessTokenHandler) {
    refreshAccessTokenHandler = handler;
}

export function refreshAccessTokenFromProvider() {
    return refreshAccessTokenHandler();
}
