import { Email } from "../../Shared/valueObjects/Email.valueObject";

export class UserEmail extends Email {
  constructor(value: string) {
    super(value);
  }
}
