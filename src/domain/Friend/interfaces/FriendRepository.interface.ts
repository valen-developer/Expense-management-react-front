import { Friend } from "../Friend.model";

export abstract class FriendRepository {
  public abstract create(friend: Friend): Promise<void>;
}
