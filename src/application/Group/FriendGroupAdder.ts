import { inject, injectable } from "tsyringe";
import { FriendGroupAdderDto } from "../../domain/Group/dtos/FriendGroupAdder.dto";
import { Group } from "../../domain/Group/Group.model";
import { GroupRepository } from "../../domain/Group/interfaces/GroupRepository.interface";

@injectable()
export class FriendGroupAdder {
  constructor(
    @inject("GroupRepository") private groupRepository: GroupRepository
  ) {}

  public async add(params: FriendGroupAdderDto): Promise<Group> {
    const { group, friendUuid } = params;

    group.addFriend(friendUuid);

    await this.groupRepository.addFriend({
      groupUuid: group.uuid.value,
      friendUuid,
    });

    return group;
  }
}
