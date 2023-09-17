export interface IInit {
    location?: string;
    uniqueId?: string;
}
export interface ICredential {
    accessToken?: string;
    refreshToken?: string;
    location?: string;
    uniqueId?: string;
    lastTokenUpdated?: string;
}
export declare const getCredentials: () => ICredential;
export declare const init: (credential?: IInit) => ICredential;
export declare const setToken: (accessToken: string, refreshToken: string) => ICredential;
export declare const setLocation: (location: string) => ICredential;
