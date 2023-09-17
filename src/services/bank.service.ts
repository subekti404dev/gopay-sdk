import { IBanks, IValidateBankAccount } from "../models/bank.model";
import { httpCust } from "../utils/http.util";

export const getBanks: () => Promise<IBanks> = async () => {
  const res = await httpCust.get("/v1/banks?type=transfer");
  return res.data;
};

export const validateBankAccount: (
  bankCode: string,
  accountNumber: string
) => Promise<IValidateBankAccount> = async (
  bankCode: string,
  accountNumber: string
) => {
  const res = await httpCust.get(
    `v1/bank-accounts/validate?bank_code=${bankCode}&account_number=${accountNumber}`
  );
  return res.data;
};

// getBanks().then((b) => console.log(b));
