import { IBanks, IValidateBankAccount } from "../models/bank.model";
import { Http } from "../utils/http.util";

export class BankService {
  _http: Http;

  constructor(http: Http) {
    this._http = http;
  }

  getBanks: () => Promise<IBanks> = async () => {
    const res = await this._http.cust.get("/v1/banks?type=transfer");
    return res.data;
  };

  validateBankAccount: (
    bankCode: string,
    accountNumber: string
  ) => Promise<IValidateBankAccount> = async (
    bankCode: string,
    accountNumber: string
  ) => {
    const res = await this._http.cust.get(
      `v1/bank-accounts/validate?bank_code=${bankCode}&account_number=${accountNumber}`
    );
    return res.data;
  };
}
