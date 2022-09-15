import { Exception } from "../../Shared/exceptions/Exception";

export class NotFoundUserException extends Exception {
  constructor(message?: string) {
    super(message ?? "User not found");
  }
}
