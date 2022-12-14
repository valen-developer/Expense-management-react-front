import { FriendDto } from "../../Friend/dtos/Friend.dto";
import { AddFriendRepositoryDto } from "../dtos/AddFriendRepository.dto";
import { GroupDto } from "../dtos/Group.dto";
import { GroupQuery } from "../dtos/GroupQuery.dto";
import { Group } from "../Group.model";

export abstract class GroupRepository {
  abstract create(group: Group): Promise<void>;
  abstract filter(query: GroupQuery): Promise<GroupDto[]>;
  abstract addFriend(params: AddFriendRepositoryDto): Promise<void>;
  abstract findFriends(groupUuid: string): Promise<FriendDto[]>;
}
