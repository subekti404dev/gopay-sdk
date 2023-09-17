import { AuthService } from "./services/auth.service";
import { BankService } from "./services/bank.service";
import { CustomerService } from "./services/customer.service";
import { Credential, ICredentialProps } from "./utils/credential.util";
import { Http } from "./utils/http.util";

class Gopay {
  _credentials: Credential;
  _http: Http;

  auth: AuthService;
  customer: CustomerService;
  bank: BankService;

  constructor(props?: ICredentialProps) {
    this._credentials = new Credential(props);
    this._http = new Http(this._credentials);
    this.auth = new AuthService(this._http, this._credentials);
    this.customer = new CustomerService(this._http);
    this.bank = new BankService(this._http);
  }
}

export default Gopay;
