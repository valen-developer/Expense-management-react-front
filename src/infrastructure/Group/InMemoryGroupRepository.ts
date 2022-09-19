import { singleton } from "tsyringe";
import { FriendDto } from "../../domain/Friend/dtos/Friend.dto";
import { AddFriendRepositoryDto } from "../../domain/Group/dtos/AddFriendRepository.dto";
import { GroupDto } from "../../domain/Group/dtos/Group.dto";
import { GroupQuery } from "../../domain/Group/dtos/GroupQuery.dto";
import { Group } from "../../domain/Group/Group.model";
import { GroupRepository } from "../../domain/Group/interfaces/GroupRepository.interface";

@singleton()
export class InMemoryGroupRepository implements GroupRepository {
  private groups: GroupDto[] = [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      friends: [],
      name: "Group 1",
      user: "userUuid",
      uuid: "groupUuid",
    },
  ];

  create(group: Group): Promise<void> {
    return new Promise((resolve) => {
      this.groups.push(group.toDto());
      resolve();
    });
  }

  public async filter(query: GroupQuery): Promise<GroupDto[]> {
    return new Promise((resolve) => {
      const groups = this.groups.filter((group) => {
        const { uuid_equals } = query;
        const hasUser = uuid_equals ? group.uuid === uuid_equals : true;

        return hasUser;
      });
      resolve(groups);
    });
  }

  addFriend(params: AddFriendRepositoryDto): Promise<void> {
    const group = this.groups.find((group) => group.uuid === params.groupUuid);

    if (!group) {
      throw new Error("Group not found");
    }

    group.friends.push(params.friendUuid);

    return Promise.resolve();
  }

  findFriends(groupUuid: string): Promise<FriendDto[]> {
    throw new Error("Method not implemented.");
  }
}
