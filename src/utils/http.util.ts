import Axios from "axios";
import CONST from "../constants/api.constant";
import { Credential } from "./credential.util";

const baseHeaders = {
  "Accept-Encoding": "gzip, deflate, br",
  "x-location-accuracy": "20.0",
  "gojek-service-area": "1",
  "country-code": "ID",
  "x-appversion": "1.6.1",
  "gojek-country-code": "ID",
  "x-phonemake": "Xiaomi",
  "x-help-version": "1.6.1",
  "user-agent": "GoPay/1.6.1 (com.gojek.gopay; build:44; Android, 8.1.0)",
  "x-deviceos": "Android, 8.1.0",
  "x-user-type": "customer",
  "x-appid": "com.gojek.gopay",
  "gojek-timezone": "Asia/Jakarta",
  "x-apptype": "GOPAY",
  "x-user-locale": "id_ID",
  "accept-language": "id-ID",
  "x-phonemodel": "Xiaomi, M2010J19SG",
  "x-platform": "Android",
};
export class Http {
  _creds: Credential;
  constructor(credentials: Credential) {
    this._creds = credentials;
  }

  _createAxiosInstance = (baseUrl: string) => {
    const { accessToken, uniqueId, location } = this._creds._credentials || {};
    return Axios.create({
      baseURL: baseUrl,
      maxBodyLength: Infinity,
      headers: {
        ...baseHeaders,
        host: baseUrl?.split("/")?.[2],
        ...(!!accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        "x-uniqueid": uniqueId,
        "x-location": location,
      },
    });
  };

  api = this._createAxiosInstance(CONST.API_BASE_URL);
  goid = this._createAxiosInstance(CONST.GOID_BASE_URL);
  cust = this._createAxiosInstance(CONST.CUST_BASE_URL);
}
