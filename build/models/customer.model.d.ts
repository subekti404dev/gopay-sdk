export interface ICustomer {
    status: string;
    message: string;
    customer: {
        id: number;
        name: string;
        email: string;
        phone: string;
        number: string;
        signed_up_country: string;
        country_code: string;
        email_verified: boolean;
        locale: string;
        locale_selection_type: string;
        facebook_connected: boolean;
        chat_id?: string;
        chat_token?: string;
        created_at: string;
        bio?: string;
        profile_image_url?: string;
        gopay_account_id: string;
    };
}
export interface IBalances {
    data: BalanceData[];
    success: boolean;
}
interface BalanceData {
    balance: Balance;
    type: string;
    token: string;
    country_code: string;
}
interface Balance {
    value: number;
    currency: string;
    display_value: string;
}
export {};
