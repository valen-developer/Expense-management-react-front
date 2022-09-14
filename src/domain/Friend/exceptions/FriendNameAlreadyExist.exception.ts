import { Exception } from "../../Shared/exceptions/Exception";

export class FriendNameAlreadyExistException extends Exception {
  constructor() {
    super(`Friend name already exist`);
  }
}
