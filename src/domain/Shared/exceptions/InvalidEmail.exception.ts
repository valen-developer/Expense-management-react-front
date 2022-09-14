import { Exception } from "./Exception";

export class InvalidEmailException extends Exception {
  constructor() {
    super("Invalid email");
  }
}
