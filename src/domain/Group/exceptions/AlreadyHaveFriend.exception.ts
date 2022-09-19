import { Exception } from "../../Shared/exceptions/Exception";

export class AlreadyHaveFriendException extends Exception {
  constructor() {
    super("Already have this friend in this group");
  }
}
