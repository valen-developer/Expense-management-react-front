import { Password } from "../../Shared/valueObjects/Password.valueObject";
import { Exception } from "../../Shared/exception/Exception";

export class InvalidPasswordException implements Exception {
  public readonly message: string = Password.formatMessage;
}
