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
export interface ICredentialProps {
    localStorage?: any;
    location?: string;
    uniqueId?: string;
    skipLocalStorage?: boolean;
}
export declare class Credential {
    _localStorage: any;
    _isSkipLocalStorage?: boolean;
    _credentials: ICredential;
    constructor(props?: ICredentialProps);
    _save: () => void;
    _init: (cred?: IInit) => void;
    getCredentials: () => ICredential;
    setToken: (accessToken: string, refreshToken: string) => ICredential;
}
