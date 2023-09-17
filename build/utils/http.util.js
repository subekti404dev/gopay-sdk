"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpCust = exports.httpGoid = exports.httpApi = void 0;
var axios_1 = __importDefault(require("axios"));
var api_constant_1 = __importDefault(require("../constants/api.constant"));
var credential_util_1 = require("./credential.util");
var baseHeaders = {
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
var http = function (baseUrl) {
    var _a;
    return axios_1.default.create({
        baseURL: baseUrl,
        maxBodyLength: Infinity,
        headers: __assign(__assign(__assign(__assign({}, baseHeaders), { host: (_a = baseUrl === null || baseUrl === void 0 ? void 0 : baseUrl.split("/")) === null || _a === void 0 ? void 0 : _a[2] }), ((0, credential_util_1.getCredentials)().accessToken
            ? { Authorization: "Bearer ".concat((0, credential_util_1.getCredentials)().accessToken) }
            : {})), { "x-uniqueid": (0, credential_util_1.getCredentials)().uniqueId, "x-location": (0, credential_util_1.getCredentials)().location }),
    });
};
exports.httpApi = http(api_constant_1.default.API_BASE_URL);
exports.httpGoid = http(api_constant_1.default.GOID_BASE_URL);
exports.httpCust = http(api_constant_1.default.CUST_BASE_URL);
//# sourceMappingURL=http.util.js.map