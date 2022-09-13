import { singleton } from "tsyringe";
import { FriendCreationException } from "../../../src/domain/Friend/exceptions/FriendCreation.exception";
import { Friend } from "../../../src/domain/Friend/Friend.model";
import { FriendRepository } from "../../../src/domain/Friend/interfaces/FriendRepository.interface";

@singleton()
export class MockedFriendRepository implements FriendRepository {
  private friends: Friend[] = [];

  public async save(friend: Friend): Promise<void> {
    return new Promise((resolve, reject) => {
      const alreadyExists = this.friends.find((f) =>
        f.name.equals(friend.name)
      );

      if (alreadyExists) reject(new FriendCreationException());

      this.friends.push(friend);
      resolve();
    });
  }
}
