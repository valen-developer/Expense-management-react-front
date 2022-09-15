import { inject, injectable } from "tsyringe";
import { Friend } from "../../domain/Friend/Friend.model";
import { GroupRepository } from "../../domain/Group/interfaces/GroupRepository.interface";

@injectable()
export class FriendGroupFinder {
  constructor(
    @inject("GroupRepository") private groupRepository: GroupRepository
  ) {}

  public async find(groupUuid: string): Promise<Friend[]> {
    const friends = await this.groupRepository.findFriends(groupUuid);

    return friends.map((friend) => new Friend(friend));
  }
}
