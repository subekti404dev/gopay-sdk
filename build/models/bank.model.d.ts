export interface IBanks {
    data: BankData;
    success: boolean;
}
interface BankData {
    top_banks: Bank[];
    banks: Bank[];
    intent: string;
}
interface Metadata {
    legacy_bank_code: string;
    company_code: string;
    minimum_amount: string;
}
interface Bank {
    bank_code: string;
    bank_short_name: string;
    bank_name: string;
    bank_icon_url: string;
    type: string;
    metadata: Metadata;
}
export interface IValidateBankAccount {
    data: ValidationData;
    success: boolean;
}
interface ValidationData {
    account_name: string;
    display_account_name: string;
}
export {};
