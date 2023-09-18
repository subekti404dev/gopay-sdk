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

export interface ITransferFee {
  data: {
    defaut_fee: Fee;
    amount: Fee;
    total_amount: Fee;
    service_fee: Fee;
  };
  success: boolean;
}

interface Fee {
  value: number;
  currency: string;
  display_value: string;
}
