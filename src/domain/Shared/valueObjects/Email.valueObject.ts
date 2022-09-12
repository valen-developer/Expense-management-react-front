import { InvalidEmailException } from "../../Auth/exceptions/InvalidEmail.exception";
import { ValueObject } from "./ValueObject";

export class Email extends ValueObject<string> {
  public static readonly invalidEmailMessage = "Invalid email";

  constructor(value: string) {
    super(value);

    if (!Email.isValidFormat(value)) {
      throw new InvalidEmailException();
    }
  }

  public static isValidFormat(email: string): boolean {
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );

    return emailRegex.test(email);
  }
}
