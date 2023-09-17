export declare const requestOTP: (phoneNumber: string) => Promise<any>;
export declare const retryOTP: (otpToken: string) => Promise<any>;
export declare const verifyOTP: (otp: string, otpToken: string) => Promise<any>;
export declare const setPin: (pin: string, challangeId: string, challangeToken: string) => Promise<any>;
export declare const refreshToken: () => Promise<any>;
export declare const logout: () => Promise<any>;
