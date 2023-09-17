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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.setPin = exports.verifyOTP = exports.retryOTP = exports.requestOTP = void 0;
var http_util_1 = require("../utils/http.util");
var api_constant_1 = __importDefault(require("../constants/api.constant"));
var credential_util_1 = require("../utils/credential.util");
var requestOTP = function (phoneNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, http_util_1.httpGoid.post("/goid/login/request", {
                    client_id: api_constant_1.default.CLIENT_ID,
                    client_secret: api_constant_1.default.CLIENT_SECRET,
                    country_code: "+62",
                    magic_link_ref: "",
                    phone_number: phoneNumber,
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
        }
    });
}); };
exports.requestOTP = requestOTP;
var retryOTP = function (otpToken) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, http_util_1.httpApi.post("/otp/retry", {
                    otp_token: otpToken,
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res.data];
        }
    });
}); };
exports.retryOTP = retryOTP;
var verifyOTP = function (otp, otpToken) { return __awaiter(void 0, void 0, void 0, function () {
    var res, _a, access_token, refresh_token, error_1, firstError;
    var _b, _c, _d, _e, _f, _g, _h, _j;
    return __generator(this, function (_k) {
        switch (_k.label) {
            case 0:
                _k.trys.push([0, 2, , 3]);
                return [4 /*yield*/, http_util_1.httpGoid.post("/goid/token", {
                        client_id: api_constant_1.default.CLIENT_ID,
                        client_secret: api_constant_1.default.CLIENT_SECRET,
                        data: { otp: otp, otp_token: otpToken },
                        grant_type: "otp",
                        scopes: [],
                    })];
            case 1:
                res = _k.sent();
                if ((_b = res.data) === null || _b === void 0 ? void 0 : _b.access_token) {
                    _a = res.data, access_token = _a.access_token, refresh_token = _a.refresh_token;
                    (0, credential_util_1.setToken)(access_token, refresh_token);
                }
                return [2 /*return*/, __assign({ next_action: null }, res.data)];
            case 2:
                error_1 = _k.sent();
                firstError = (_e = (_d = (_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.errors) === null || _e === void 0 ? void 0 : _e[0];
                if ((firstError === null || firstError === void 0 ? void 0 : firstError.code) === "mfa:customer_send_challenge:challenge_required") {
                    return [2 /*return*/, {
                            next_action: "set_pin",
                            challenge_token: (_f = firstError === null || firstError === void 0 ? void 0 : firstError.details) === null || _f === void 0 ? void 0 : _f.challenge_token,
                            challenge_id: (_j = (_h = (_g = firstError === null || firstError === void 0 ? void 0 : firstError.details) === null || _g === void 0 ? void 0 : _g.challenges) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.gopay_challenge_id,
                        }];
                }
                else {
                    throw error_1;
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.verifyOTP = verifyOTP;
var setPin = function (pin, challangeId, challangeToken) { return __awaiter(void 0, void 0, void 0, function () {
    var res, token, resp, _a, access_token, refresh_token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, http_util_1.httpCust.post("api/v1/users/pin/tokens", {
                    pin: pin,
                    client_id: api_constant_1.default.MFA_CLIENT_ID,
                    challenge_id: challangeId,
                })];
            case 1:
                res = _b.sent();
                if (!res.data) return [3 /*break*/, 3];
                token = res.data.data.token;
                if (!token) return [3 /*break*/, 3];
                return [4 /*yield*/, http_util_1.httpGoid.post("/goid/token", {
                        client_id: api_constant_1.default.CLIENT_ID,
                        client_secret: api_constant_1.default.CLIENT_SECRET,
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
                    })];
            case 2:
                resp = _b.sent();
                _a = resp.data, access_token = _a.access_token, refresh_token = _a.refresh_token;
                (0, credential_util_1.setToken)(access_token, refresh_token);
                return [2 /*return*/, resp.data];
            case 3: return [2 /*return*/, res.data];
        }
    });
}); };
exports.setPin = setPin;
var refreshToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, _a, access_token, refresh_token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, http_util_1.httpGoid.post("/goid/token", {
                    client_id: api_constant_1.default.CLIENT_ID,
                    client_secret: api_constant_1.default.CLIENT_SECRET,
                    data: { refresh_token: (0, credential_util_1.getCredentials)().refreshToken },
                    grant_type: "refresh_token",
                    scopes: [],
                })];
            case 1:
                res = _b.sent();
                if (res.data) {
                    _a = res.data, access_token = _a.access_token, refresh_token = _a.refresh_token;
                    (0, credential_util_1.setToken)(access_token, refresh_token);
                }
                return [2 /*return*/, res.data];
        }
    });
}); };
exports.refreshToken = refreshToken;
var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, http_util_1.httpGoid.delete("/goid/token", {
                    headers: {
                        "x-clientsecret": api_constant_1.default.CLIENT_SECRET,
                        "x-clientname": "gopay:consumer:app",
                    },
                })];
            case 1:
                res = _a.sent();
                (0, credential_util_1.setToken)("", "");
                return [2 /*return*/, res.data];
        }
    });
}); };
exports.logout = logout;
//# sourceMappingURL=auth.service.js.map