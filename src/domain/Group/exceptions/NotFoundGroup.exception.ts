import { Exception } from "../../Shared/exceptions/Exception";

export class NotFoundGroupException extends Exception {
  constructor() {
    super("Group not found");
  }
}
