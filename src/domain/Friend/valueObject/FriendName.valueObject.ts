import { NotNullValueObjet } from "../../Shared/valueObjects/NotNull.valueObject";

export class FriendName extends NotNullValueObjet<string> {
  constructor(value: string) {
    super(value, "Friend name");
  }
}
