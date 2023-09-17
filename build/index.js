"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_service_1 = require("./services/auth.service");
var bank_service_1 = require("./services/bank.service");
var customer_service_1 = require("./services/customer.service");
var credential_util_1 = require("./utils/credential.util");
var http_util_1 = require("./utils/http.util");
var Gopay = /** @class */ (function () {
    function Gopay(props) {
        this._credentials = new credential_util_1.Credential(props);
        this._http = new http_util_1.Http(this._credentials);
        this.auth = new auth_service_1.AuthService(this._http, this._credentials);
        this.customer = new customer_service_1.CustomerService(this._http);
        this.bank = new bank_service_1.BankService(this._http);
    }
    return Gopay;
}());
exports.default = Gopay;
//# sourceMappingURL=index.js.map