import Axios from "axios";
import CONST from "../constants/api.constant";
import { getCredentials } from "./credential.util";

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
const http = (baseUrl: string) =>
  Axios.create({
    baseURL: baseUrl,
    maxBodyLength: Infinity,
    headers: {
      ...baseHeaders,
      host: baseUrl?.split("/")?.[2],
      ...(getCredentials().accessToken
        ? { Authorization: `Bearer ${getCredentials().accessToken}` }
        : {}),
      "x-uniqueid": getCredentials().uniqueId,
      "x-location": getCredentials().location,
    },
  });

export const httpApi = http(CONST.API_BASE_URL);
export const httpGoid = http(CONST.GOID_BASE_URL);
export const httpCust = http(CONST.CUST_BASE_URL);
