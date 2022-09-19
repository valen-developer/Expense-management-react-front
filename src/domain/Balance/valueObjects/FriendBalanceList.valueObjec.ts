import { List } from "../../Shared/valueObjects/List.valueObject";
import { FriendBalance } from "../FriendBalance.model";

export class FriendBalanceList extends List<FriendBalance> {
  constructor(friendsBalance: FriendBalance[]) {
    super(friendsBalance);
  }
}
