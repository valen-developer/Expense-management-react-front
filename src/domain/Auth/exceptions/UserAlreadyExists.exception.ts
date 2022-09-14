import { Exception } from "../../Shared/exceptions/Exception";

export class UserAlreadyExistsException extends Exception {
  constructor() {
    super("User already exists");
  }
}
