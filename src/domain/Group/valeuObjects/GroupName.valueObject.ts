import { NotNullValueObject } from "../../Shared/valueObjects/NotNull.valueObject";

export class GroupName extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "Group name");
  }
}
