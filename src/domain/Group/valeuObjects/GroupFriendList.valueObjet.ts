import { List } from "../../Shared/valueObjects/List.valueObject";

export class GroupFriendList extends List<string> {
  constructor(value: string[]) {
    super(value);
  }
}
