import { IBanks, IValidateBankAccount } from "../models/bank.model";
import { Http } from "../utils/http.util";
export declare class BankService {
    _http: Http;
    constructor(http: Http);
    getBanks: () => Promise<IBanks>;
    validateBankAccount: (bankCode: string, accountNumber: string) => Promise<IValidateBankAccount>;
}
