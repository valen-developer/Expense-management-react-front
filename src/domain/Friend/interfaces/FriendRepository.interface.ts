import { FriendDto } from "../dtos/Friend.dto";
import { FriendQuery } from "../dtos/FriendQuery.dto";
import { Friend } from "../Friend.model";

export abstract class FriendRepository {
  public abstract create(friend: Friend): Promise<void>;
  public abstract filter(query: FriendQuery): Promise<FriendDto[]>;
}
