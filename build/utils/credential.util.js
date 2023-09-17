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
exports.setLocation = exports.setToken = exports.init = exports.getCredentials = void 0;
var unique_id_util_1 = require("./unique-id.util");
var credentialsKey = "GOPAY_CREDENTIALS";
var getCredentials = function () {
    var lsCredentials = localStorage.getItem(credentialsKey);
    var credentials = {
        accessToken: "",
        refreshToken: "",
        location: "-6.2438422,106.8026804",
        uniqueId: (0, unique_id_util_1.generateUniqueId)(),
        lastTokenUpdated: "",
    };
    if (!localStorage.getItem(credentialsKey)) {
        localStorage.setItem(credentialsKey, JSON.stringify(credentials));
        return credentials;
    }
    try {
        return JSON.parse(lsCredentials);
    }
    catch (error) {
        return credentials;
    }
};
exports.getCredentials = getCredentials;
var init = function (cred) {
    if (cred === void 0) { cred = {}; }
    var credentials = __assign(__assign(__assign({}, (0, exports.getCredentials)()), (!!cred.location && { location: cred.location })), (!!cred.uniqueId && { uniqueId: cred.uniqueId }));
    localStorage.setItem(credentialsKey, JSON.stringify(credentials));
    return credentials;
};
exports.init = init;
var setToken = function (accessToken, refreshToken) {
    var newCredentials = __assign(__assign({}, (0, exports.getCredentials)()), { accessToken: accessToken, refreshToken: refreshToken, lastTokenUpdated: Date.now().toString() });
    localStorage.setItem(credentialsKey, JSON.stringify(newCredentials));
    return newCredentials;
};
exports.setToken = setToken;
var setLocation = function (location) {
    var newCredentials = __assign(__assign({}, (0, exports.getCredentials)()), { location: location });
    localStorage.setItem(credentialsKey, JSON.stringify(newCredentials));
    return newCredentials;
};
exports.setLocation = setLocation;
// console.log(getCredentials());
//# sourceMappingURL=credential.util.js.map