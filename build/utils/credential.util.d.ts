export interface ICredential {
    accessToken?: string;
    refreshToken?: string;
    location?: string;
    uniqueId?: string;
    lastTokenUpdated?: string;
}
export declare const getCredentials: () => ICredential;
export declare const init: (credential?: ICredential) => ICredential;
export declare const setToken: (accessToken: string, refreshToken: string) => ICredential;
export declare const setLocation: (location: string) => ICredential;
