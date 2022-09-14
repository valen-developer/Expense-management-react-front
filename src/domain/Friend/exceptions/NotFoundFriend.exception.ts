import { Exception } from "../../Shared/exceptions/Exception";

export class NotFoundFriendException extends Exception {
  constructor() {
    super("Friend not found");
  }
}
