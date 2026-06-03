export interface IOAuthProfile {
    provider: string;
    providerUserId: string;
    email?: string;
    displayName?: string;
}

export interface IOAuthTokenSet {
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
}
