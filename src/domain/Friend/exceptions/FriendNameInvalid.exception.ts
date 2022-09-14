import { Exception } from "../../Shared/exceptions/Exception";
import { FriendName } from "../valueObjects/FriendName.valueObject";

export class FriendNameInvalidException extends Exception {
  constructor() {
    super(FriendName.INVALID_MESSAGE);
  }
}
