import {
  IBanks,
  ITransferFee,
  IValidateBankAccount,
} from "../models/bank.model";
import { Http } from "../utils/http.util";
import { CustomerService } from "./customer.service";

export class BankService {
  _http: Http;
  _custService: CustomerService;

  constructor(http: Http, custService: CustomerService) {
    this._http = http;
    this._custService = custService;
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

  checkTransferFee: (
    amount: number,
    bankCode: string,
    bankAccount: string
  ) => Promise<ITransferFee> = async (
    amount: number,
    bankCode: string,
    bankAccount: string
  ) => {
    const gopayWallet = (await this._custService.getBalances())?.data?.find(
      (w) => w.type === "GOPAY_WALLET"
    );
    const resp = await this._http.cust.get(`v1/transfers/fee`, {
      params: {
        source_method: "GOPAY_WALLET",
        payment_option_token: gopayWallet?.token,
        amount,
        currency: "IDR",
        destination_id: bankAccount,
        destination_id_type: "DESTINATION_ACCOUNT_ID",
        account_id: bankAccount,
        company_code: bankCode,
      },
    });
    return resp.data;
  };

  
}
