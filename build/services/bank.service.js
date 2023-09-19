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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankService = void 0;
var BankService = /** @class */ (function () {
    function BankService(http, custService) {
        var _this = this;
        this.getBanks = function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._http.cust.get("/v1/banks?type=transfer")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        }); };
        this.validateBankAccount = function (bankCode, accountNumber) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._http.cust.get("v1/bank-accounts/validate?bank_code=".concat(bankCode, "&account_number=").concat(accountNumber))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        }); };
        this.checkTransferFee = function (amount, bankCode, bankAccount) { return __awaiter(_this, void 0, void 0, function () {
            var gopayWallet, resp;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._custService.getBalances()];
                    case 1:
                        gopayWallet = (_b = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.find(function (w) { return w.type === "GOPAY_WALLET"; });
                        return [4 /*yield*/, this._http.cust.get("v1/transfers/fee", {
                                params: {
                                    source_method: "GOPAY_WALLET",
                                    payment_option_token: gopayWallet === null || gopayWallet === void 0 ? void 0 : gopayWallet.token,
                                    amount: amount,
                                    currency: "IDR",
                                    destination_id: bankAccount,
                                    destination_id_type: "DESTINATION_ACCOUNT_ID",
                                    account_id: bankAccount,
                                    company_code: bankCode,
                                },
                            })];
                    case 2:
                        resp = _c.sent();
                        return [2 /*return*/, resp.data];
                }
            });
        }); };
        this.transfer = function (amount, bankCode, bankAccount, pin) { return __awaiter(_this, void 0, void 0, function () {
            var _postData, gopayWallet, receiver, challengeData, error_1, errRespData, respPin, tfData, data;
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 4, , 9]);
                        return [4 /*yield*/, this._custService.getBalances()];
                    case 1:
                        gopayWallet = (_b = (_a = (_g.sent())) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.find(function (w) { return w.type === "GOPAY_WALLET"; });
                        return [4 /*yield*/, this.validateBankAccount(bankCode, bankAccount)];
                    case 2:
                        receiver = _g.sent();
                        _postData = {
                            source: {
                                payment_method: "GOPAY_WALLET",
                                payment_option_token: gopayWallet === null || gopayWallet === void 0 ? void 0 : gopayWallet.token,
                            },
                            destination: {
                                account_id: bankAccount,
                                account_name: receiver.data.account_name,
                                company_code: bankCode,
                            },
                            amount: { value: amount, currency: "IDR" },
                            metadata: { receiver_name: receiver.data.account_name },
                            additional_details: {
                                device_info: "".concat(this._http._creds._credentials.uniqueId, "||Mozilla/5.0 (Linux; Android 8.1.0; Android SDK built for x86_64 Build/OSM1.180201.023; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36||"),
                            },
                        };
                        return [4 /*yield*/, this._http.cust.post("v1/transfers", _postData)];
                    case 3:
                        challengeData = (_g.sent()).data;
                        return [2 /*return*/, challengeData];
                    case 4:
                        error_1 = _g.sent();
                        errRespData = (_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _c === void 0 ? void 0 : _c.data;
                        if (!((_d = errRespData === null || errRespData === void 0 ? void 0 : errRespData.data) === null || _d === void 0 ? void 0 : _d.client_id)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this._http.cust.post("api/v1/users/pin/tokens", {
                                pin: pin,
                                client_id: errRespData.data.client_id,
                                challenge_id: errRespData.data.challenge_id,
                            })];
                    case 5:
                        respPin = _g.sent();
                        tfData = __assign(__assign({}, _postData), { challenge: {
                                action: null,
                                value: {
                                    pin_token: (_f = (_e = respPin === null || respPin === void 0 ? void 0 : respPin.data) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.token,
                                },
                                type: "GOPAY_PIN_CHALLENGE",
                                metadata: {},
                            } });
                        return [4 /*yield*/, this._http.cust.post("v1/transfers", tfData)];
                    case 6:
                        data = (_g.sent()).data;
                        return [2 /*return*/, data];
                    case 7: throw error_1;
                    case 8: return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        this._http = http;
        this._custService = custService;
    }
    return BankService;
}());
exports.BankService = BankService;
//# sourceMappingURL=bank.service.js.map