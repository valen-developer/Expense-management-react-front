import { Exception } from "../../Shared/exceptions/Exception";

export class SigninException extends Exception {
  constructor() {
    super("User or password is invalid");
  }
}
