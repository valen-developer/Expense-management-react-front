import { Exception } from "../../Shared/exceptions/Exception";

export class InvalidAmountException extends Exception {
  constructor() {
    super("Amount must be greater than 0");
  }
}
