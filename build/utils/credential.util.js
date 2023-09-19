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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credential = void 0;
var unique_id_util_1 = require("./unique-id.util");
var credentialsKey = "GOPAY_CREDENTIALS";
var Credential = /** @class */ (function () {
    function Credential(props) {
        var _this = this;
        if (props === void 0) { props = {
            skipLocalStorage: false,
        }; }
        this._credentials = {};
        this._save = function () {
            if (_this._isSkipLocalStorage)
                return;
            _this._localStorage.setItem(credentialsKey, JSON.stringify(_this._credentials));
        };
        this._init = function (cred) {
            if (cred === void 0) { cred = {}; }
            _this._credentials = {
                accessToken: "",
                refreshToken: "",
                location: "-6.2438422,106.8026804",
                uniqueId: (0, unique_id_util_1.generateUniqueId)(),
                lastTokenUpdated: "",
            };
            if (!_this._isSkipLocalStorage) {
                var lsCredentials = _this._localStorage.getItem(credentialsKey);
                if (lsCredentials) {
                    try {
                        var tmp = JSON.parse(lsCredentials);
                        _this._credentials = tmp;
                    }
                    catch (error) { }
                }
            }
            _this._credentials = __assign(__assign(__assign({}, _this._credentials), (!!cred.location && { location: cred.location })), (!!cred.uniqueId && { uniqueId: cred.uniqueId }));
            _this._save();
        };
        this.getCredentials = function () {
            return _this._credentials;
        };
        this.setToken = function (accessToken, refreshToken) {
            _this._credentials = __assign(__assign(__assign(__assign({}, _this._credentials), (!!accessToken && { accessToken: accessToken })), (!!refreshToken && { refreshToken: refreshToken })), { lastTokenUpdated: (new Date().getTime() / 1000).toString() });
            _this._save();
            return _this._credentials;
        };
        if (!props.skipLocalStorage) {
            if (props.localStorage) {
                this._localStorage = props.localStorage;
            }
            else {
                this._localStorage = window.localStorage;
            }
        }
        this._isSkipLocalStorage = props.skipLocalStorage;
        this._init({ location: props.location, uniqueId: props.uniqueId });
    }
    return Credential;
}());
exports.Credential = Credential;
//# sourceMappingURL=credential.util.js.map