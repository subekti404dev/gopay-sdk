import {
  IBanks,
  ITransferChallenge,
  ITransferFee,
  IValidateBankAccount,
} from "../models/bank.model";
import { BalanceData } from "../models/customer.model";
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

  transfer = async (
    amount: number,
    bankCode: string,
    bankAccount: string,
    pin: string
  ) => {
    let _postData: any;
    try {
      const gopayWallet = (await this._custService.getBalances())?.data?.find(
        (w) => w.type === "GOPAY_WALLET"
      );
      const receiver = await this.validateBankAccount(bankCode, bankAccount);
      _postData = {
        source: {
          payment_method: "GOPAY_WALLET",
          payment_option_token: gopayWallet?.token,
        },
        destination: {
          account_id: bankAccount,
          account_name: receiver.data.account_name,
          company_code: bankCode,
        },
        amount: { value: amount, currency: "IDR" },
        metadata: { receiver_name: receiver.data.account_name },
        additional_details: {
          device_info: `${this._http._creds._credentials.uniqueId}||Mozilla/5.0 (Linux; Android 8.1.0; Android SDK built for x86_64 Build/OSM1.180201.023; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36||`,
        },
      };
      const { data: challengeData } =
        await this._http.cust.post<ITransferChallenge>(
          `v1/transfers`,
          _postData
        );

      return challengeData;
    } catch (error) {
      const errRespData = error?.response?.data;

      if (errRespData?.data?.client_id) {
        const respPin = await this._http.cust.post(`api/v1/users/pin/tokens`, {
          pin,
          client_id: errRespData.data.client_id,
          challenge_id: errRespData.data.challenge_id,
        });

        const tfData = {
          ..._postData,
          challenge: {
            action: null,
            value: {
              pin_token: respPin?.data?.data?.token,
            },
            type: "GOPAY_PIN_CHALLENGE",
            metadata: {},
          },
        };

        const { data } = await this._http.cust.post(`v1/transfers`, tfData);
        return data;
      } else {
        throw error;
      }
    }
  };
}
