import { Exception } from "../../Shared/exceptions/Exception";

export class PasswordConfirmationException extends Exception {
  constructor() {
    super("Password confirmation does not match password");
  }
}
