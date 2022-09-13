import { NotNullValueObjet } from "../../Shared/valueObjects/NotNull.valueObject";

export class GroupName extends NotNullValueObjet<string> {
  constructor(value: string) {
    super(value, "group name");
  }
}
