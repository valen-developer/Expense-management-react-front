import { Exception } from "../../Shared/exception/Exception";

export class FriendCreationException extends Exception {
  constructor() {
    super("Friend creation error");
  }
}
