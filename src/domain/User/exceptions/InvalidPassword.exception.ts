import { Exception } from "../../Shared/exceptions/Exception";
import { UserPassword } from "../valueObjects/UserPassword.valueObject";

export class InvalidPasswordException extends Exception {
  constructor() {
    super(UserPassword.EXCEPTION_MESSAGE);
  }
}
