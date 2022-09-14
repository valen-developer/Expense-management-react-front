import { Exception } from "./Exception";

export class NullException extends Exception {
  constructor(entity: string) {
    super(`${entity} cannot be null or undefined`);
  }
}
