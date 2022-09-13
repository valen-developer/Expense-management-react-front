import { NotNullValueObjet } from "../../Shared/valueObjects/NotNull.valueObject";

export class UserName extends NotNullValueObjet<string> {
  constructor(value: string) {
    super(value, "user name");
  }
}
