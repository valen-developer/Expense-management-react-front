import { InvalidPasswordException } from "../../Auth/exceptions/InvalidPassword.exception";
import { ValueObject } from "./ValueObject";

export class Password extends ValueObject<string> {
  public static readonly formatMessage =
    "Password should be between 8 and 20 characters, and contain at least one uppercase letter, one lowercase letter and one number";

  constructor(value: string) {
    super(value);
    if (!Password.isValidFormat(value)) {
      throw new InvalidPasswordException();
    }
  }

  public static isValidFormat(password: string): boolean {
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,20})"
    );

    return passwordRegex.test(password);
  }
}
