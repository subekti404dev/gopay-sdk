import { Http } from "../utils/http.util";
import { Credential } from "../utils/credential.util";
export declare class AuthService {
    _http: Http;
    _credentials: Credential;
    constructor(http: Http, credentials: Credential);
    requestOTP: (phoneNumber: string) => Promise<any>;
    retryOTP: (otpToken: string) => Promise<any>;
    verifyOTP: (otp: string, otpToken: string) => Promise<any>;
    setPin: (pin: string, challangeId: string, challangeToken: string) => Promise<any>;
    refreshToken: () => Promise<any>;
    logout: () => Promise<any>;
}
