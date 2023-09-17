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
exports.Http = void 0;
var axios_1 = __importDefault(require("axios"));
var api_constant_1 = __importDefault(require("../constants/api.constant"));
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
var Http = /** @class */ (function () {
    function Http(credentials) {
        var _this = this;
        this._createAxiosInstance = function (baseUrl) {
            var _a;
            var _b = _this._creds._credentials || {}, accessToken = _b.accessToken, uniqueId = _b.uniqueId, location = _b.location;
            return axios_1.default.create({
                baseURL: baseUrl,
                maxBodyLength: Infinity,
                headers: __assign(__assign(__assign(__assign({}, baseHeaders), { host: (_a = baseUrl === null || baseUrl === void 0 ? void 0 : baseUrl.split("/")) === null || _a === void 0 ? void 0 : _a[2] }), (!!accessToken ? { Authorization: "Bearer ".concat(accessToken) } : {})), { "x-uniqueid": uniqueId, "x-location": location }),
            });
        };
        this.api = this._createAxiosInstance(api_constant_1.default.API_BASE_URL);
        this.goid = this._createAxiosInstance(api_constant_1.default.GOID_BASE_URL);
        this.cust = this._createAxiosInstance(api_constant_1.default.CUST_BASE_URL);
        this._creds = credentials;
    }
    return Http;
}());
exports.Http = Http;
//# sourceMappingURL=http.util.js.map