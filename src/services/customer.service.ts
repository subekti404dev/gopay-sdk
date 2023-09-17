import { ICustomer, IBalances } from "../models/customer.model";
import { Http } from "../utils/http.util";

export class CustomerService {
  _http: Http;
  constructor(http: Http) {
    this._http = http;
  }

  getCustomerInfo: () => Promise<ICustomer> = async () => {
    const res = await this._http.api.get("/gojek/v2/customer");
    return res.data;
  };

  getBalances: () => Promise<IBalances> = async () => {
    const res = await this._http.cust.get("v1/payment-options/balances");
    return res.data;
  };
}
