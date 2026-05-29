export type JoinUserRequest = {
    email: string;
    passwordPlain: string;
    nickname: string;
};

export type JoinUserData = {
    createdId: number;
};
