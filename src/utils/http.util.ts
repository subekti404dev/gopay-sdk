import Axios, { AxiosInstance } from "axios";
import CONST from "../constants/api.constant";
import { Credential, ICredential } from "./credential.util";

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

  api: AxiosInstance;
  goid: AxiosInstance;
  cust: AxiosInstance;

  constructor(credentials: Credential, proxy?: string) {
    this._creds = credentials;

    const _createAxiosInstance = (
      baseUrl: string,
      credentials: ICredential
    ) => {
      const { accessToken, uniqueId, location } = credentials || {};
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

    const getUrl = (url) => (!!proxy ? proxy + url : url);

    this.api = _createAxiosInstance(
      getUrl(CONST.API_BASE_URL),
      credentials._credentials
    );
    this.goid = _createAxiosInstance(
      getUrl(CONST.GOID_BASE_URL),
      credentials._credentials
    );
    this.cust = _createAxiosInstance(
      getUrl(CONST.CUST_BASE_URL),
      credentials._credentials
    );
  }
}
