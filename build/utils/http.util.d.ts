import { Credential } from "./credential.util";
export declare class Http {
    _creds: Credential;
    constructor(credentials: Credential);
    _createAxiosInstance: (baseUrl: string) => import("axios").AxiosInstance;
    api: import("axios").AxiosInstance;
    goid: import("axios").AxiosInstance;
    cust: import("axios").AxiosInstance;
}
