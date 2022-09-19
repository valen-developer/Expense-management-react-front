import { FriendDto } from "../../domain/Friend/dtos/Friend.dto";
import { FriendQuery } from "../../domain/Friend/dtos/FriendQuery.dto";
import { Friend } from "../../domain/Friend/Friend.model";
import { FriendRepository } from "../../domain/Friend/interfaces/FriendRepository.interface";

export class InMemoryFriendRepository implements FriendRepository {
  private friends: FriendDto[] = [];

  public create(friend: Friend): Promise<void> {
    return new Promise((resolve) => {
      this.friends.push(friend.toDto());
      resolve();
    });
  }

  public filter(query: FriendQuery): Promise<FriendDto[]> {
    return new Promise((resolve) => {
      const friends = this.friends.filter((friend) => {
        const { uuid_equals, user_equals } = query;
        const hasUser = user_equals ? friend.user === user_equals : true;
        const hasUuid = uuid_equals ? friend.uuid === uuid_equals : true;

        return hasUser && hasUuid;
      });
      resolve(friends);
    });
  }
}
