import * as auth from "./services/auth.service";
import * as bank from "./services/bank.service";
import * as customer from "./services/customer.service";
import { init } from "./utils/credential.util";

const gopay = {
  auth,
  bank,
  customer,
  init,
};

export default gopay;