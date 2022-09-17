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
    throw new Error("Method not implemented.");
  }

  public async filter(query: GroupQuery): Promise<GroupDto[]> {
    return new Promise((resolve) => {
      const groups = this.groups.filter((group) => {
        // TODO: Add more filters
        // if (query.user_equals) {
        //   return group.user === query.user_equals;
        // }
        return true;
      });
      resolve(groups);
    });
  }
  addFriend(params: AddFriendRepositoryDto): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findFriends(groupUuid: string): Promise<FriendDto[]> {
    throw new Error("Method not implemented.");
  }
}
