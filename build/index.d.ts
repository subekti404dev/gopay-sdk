import * as auth from "./services/auth.service";
import * as bank from "./services/bank.service";
import * as customer from "./services/customer.service";
declare const gopay: {
    auth: typeof auth;
    bank: typeof bank;
    customer: typeof customer;
    init: (credential?: import("./utils/credential.util").IInit | undefined) => import("./utils/credential.util").ICredential;
};
export default gopay;
