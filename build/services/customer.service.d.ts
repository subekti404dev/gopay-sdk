import { ICustomer, IBalances } from "../models/customer.model";
import { Http } from "../utils/http.util";
export declare class CustomerService {
    _http: Http;
    constructor(http: Http);
    getCustomerInfo: () => Promise<ICustomer>;
    getBalances: () => Promise<IBalances>;
}
