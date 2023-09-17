import { AxiosInstance } from "axios";
import { Credential, IProxy } from "./credential.util";
export declare class Http {
    _creds: Credential;
    api: AxiosInstance;
    goid: AxiosInstance;
    cust: AxiosInstance;
    constructor(credentials: Credential, proxy?: IProxy);
}
