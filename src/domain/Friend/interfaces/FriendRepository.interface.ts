import { Friend } from "../Friend.model";

export abstract class FriendRepository {
  abstract save(friend: Friend): Promise<void>;
}
