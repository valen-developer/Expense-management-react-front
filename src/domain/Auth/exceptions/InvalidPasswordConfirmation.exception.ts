import { Exception } from "../../Shared/exception/Exception";

export class InvalidPasswordConfirmationException implements Exception {
  public readonly message: string = "Password confirmation does not match";
}
