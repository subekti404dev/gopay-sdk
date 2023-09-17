import { ICustomer, IBalances } from "../models/customer.model";
import { httpApi, httpCust } from "../utils/http.util";

export const getCustomerInfo: () => Promise<ICustomer> = async () => {
  const res = await httpApi.get("/gojek/v2/customer");
  return res.data;
};

export const getBalances: () => Promise<IBalances> = async () => {
  const res = await httpCust.get("v1/payment-options/balances");
  return res.data;
};

// getBalances().then(b => console.log(b.data));
