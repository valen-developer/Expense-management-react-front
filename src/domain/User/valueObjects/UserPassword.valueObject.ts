import { NotNullValueObject } from "../../Shared/valueObjects/NotNull.valueObject";
import { InvalidPasswordException } from "../exceptions/InvalidPassword.exception";

export class UserPassword extends NotNullValueObject<string> {
  public static readonly EXCEPTION_MESSAGE =
    "Invalid password: between 8 and 20 characters, at least one uppercase letter, one lowercase letter and one number";

  public static readonly PASSWORD_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,20})"
  );

  constructor(value: string) {
    super(value, "UserPassword");

    this.checkIfPassword(value);
  }

  private checkIfPassword(value: string): void {
    if (!UserPassword.PASSWORD_REGEX.test(value)) {
      throw new InvalidPasswordException();
    }
  }
}
