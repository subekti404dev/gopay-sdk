import CONST from "../constants/api.constant";
import { Http } from "../utils/http.util";
import { Credential } from "../utils/credential.util";

export class AuthService {
  _http: Http;
  _credentials: Credential;

  constructor(http: Http, credentials: Credential) {
    this._http = http;
    this._credentials = credentials;
  }

  requestOTP: (phoneNumber: string) => Promise<any> = async (
    phoneNumber: string
  ) => {
    const res = await this._http.goid.post("/goid/login/request", {
      client_id: CONST.CLIENT_ID,
      client_secret: CONST.CLIENT_SECRET,
      country_code: "+62",
      magic_link_ref: "",
      phone_number: phoneNumber,
    });
    return res.data;
  };

  retryOTP: (otpToken: string) => Promise<any> = async (otpToken: string) => {
    const res = await this._http.api.post("/otp/retry", {
      otp_token: otpToken,
    });
    return res.data;
  };

  verifyOTP: (otp: string, otpToken: string) => Promise<any> = async (
    otp: string,
    otpToken: string
  ) => {
    try {
      const res = await this._http.goid.post("/goid/token", {
        client_id: CONST.CLIENT_ID,
        client_secret: CONST.CLIENT_SECRET,
        data: { otp, otp_token: otpToken },
        grant_type: "otp",
        scopes: [],
      });
      if (res.data?.access_token) {
        const { access_token, refresh_token } = res.data;
        this._credentials.setToken(access_token, refresh_token);
      }
      return {
        next_action: null,
        ...res.data,
      };
    } catch (error: any) {
      const firstError = error?.response?.data?.errors?.[0];
      if (
        firstError?.code === "mfa:customer_send_challenge:challenge_required"
      ) {
        return {
          next_action: "set_pin",
          challenge_token: firstError?.details?.challenge_token,
          challenge_id:
            firstError?.details?.challenges?.[0]?.gopay_challenge_id,
        };
      } else {
        throw error;
      }
    }
  };

  setPin: (
    pin: string,
    challangeId: string,
    challangeToken: string
  ) => Promise<any> = async (
    pin: string,
    challangeId: string,
    challangeToken: string
  ) => {
    const res = await this._http.cust.post("api/v1/users/pin/tokens", {
      pin,
      client_id: CONST.MFA_CLIENT_ID,
      challenge_id: challangeId,
    });
    if (res.data) {
      const {
        data: { token },
      } = res.data;
      if (token) {
        const resp = await this._http.goid.post("/goid/token", {
          client_id: CONST.CLIENT_ID,
          client_secret: CONST.CLIENT_SECRET,
          data: {
            challenge_token: challangeToken,
            challenges: [
              {
                name: "GoPay Pin 2FA",
                value: token,
              },
            ],
          },
          grant_type: "challenge",
        });
        const { access_token, refresh_token } = resp.data;
        this._credentials.setToken(access_token, refresh_token);
        return resp.data;
      }
    }
    return res.data;
  };

  refreshToken: () => Promise<any> = async () => {
    const res = await this._http.goid.post("/goid/token", {
      client_id: CONST.CLIENT_ID,
      client_secret: CONST.CLIENT_SECRET,
      data: { refresh_token: this._credentials._credentials.refreshToken },
      grant_type: "refresh_token",
      scopes: [],
    });
    if (res.data) {
      const { access_token, refresh_token } = res.data;
      this._credentials.setToken(access_token, refresh_token);
    }
    return res.data;
  };

  logout: () => Promise<any> = async () => {
    const res = await this._http.goid.delete("/goid/token", {
      headers: {
        "x-clientsecret": CONST.CLIENT_SECRET,
        "x-clientname": "gopay:consumer:app",
      },
    });
    this._credentials.setToken("", "");
    return res.data;
  };
}
