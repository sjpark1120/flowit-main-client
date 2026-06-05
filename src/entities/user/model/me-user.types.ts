type MeUserWorkspace = {
    id: number;
    name: string;
    description: string | null;
    memberCount: number;
    role: string;
    joinedAt: number;
};

export type MeUserResponse = {
    id: number; // 사용자 식별자
    email: string;
    nickname: string;
    status: string;
    profileImageFileId: number | null;
    profileImageUrl: string | null;
    workspaces: MeUserWorkspace[];
    extensions: Record<string, unknown>;
};
