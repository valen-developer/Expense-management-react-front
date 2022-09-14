import { InvalidEmailException } from "../exceptions/InvalidEmail.exception";
import { NotNullValueObject } from "./NotNull.valueObject";

export abstract class Email extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "Email");
    this.checkIfEmail(value);
  }

  public static isEmail(value: string): boolean {
    const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    return regex.test(value);
  }

  protected checkIfEmail(value: string): void {
    if (!Email.isEmail(value)) {
      throw new InvalidEmailException();
    }
  }
}
