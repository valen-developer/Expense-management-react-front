import { Exception } from "../../Shared/exception/Exception";

export class InvalidSigninException implements Exception {
  public readonly message: string = "User or password invalid";
}
