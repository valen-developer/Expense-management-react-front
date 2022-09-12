import { Email } from "../../Shared/valueObjects/Email.valueObject";
import { Exception } from "../../Shared/exception/Exception";

export class InvalidEmailException implements Exception {
  public readonly message: string = Email.invalidEmailMessage;
}
