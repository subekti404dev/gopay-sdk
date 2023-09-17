import { IBanks, IValidateBankAccount } from "../models/bank.model";
export declare const getBanks: () => Promise<IBanks>;
export declare const validateBankAccount: (bankCode: string, accountNumber: string) => Promise<IValidateBankAccount>;
