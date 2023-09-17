import { AuthService } from "./services/auth.service";
import { BankService } from "./services/bank.service";
import { CustomerService } from "./services/customer.service";
import { Credential, ICredentialProps } from "./utils/credential.util";
import { Http } from "./utils/http.util";
declare class Gopay {
    _credentials: Credential;
    _http: Http;
    auth: AuthService;
    customer: CustomerService;
    bank: BankService;
    constructor(props?: ICredentialProps);
}
export default Gopay;
