import { IBanks, ITransferFee, IValidateBankAccount } from "../models/bank.model";
import { Http } from "../utils/http.util";
import { CustomerService } from "./customer.service";
export declare class BankService {
    _http: Http;
    _custService: CustomerService;
    constructor(http: Http, custService: CustomerService);
    getBanks: () => Promise<IBanks>;
    validateBankAccount: (bankCode: string, accountNumber: string) => Promise<IValidateBankAccount>;
    checkTransferFee: (amount: number, bankCode: string, bankAccount: string) => Promise<ITransferFee>;
    transfer: (amount: number, bankCode: string, bankAccount: string, pin: string) => Promise<any>;
}
