import { GroupDto } from "../dtos/Group.dto";
import { GroupQuery } from "../dtos/GroupQuery.dto";
import { Group } from "../Group.model";

export abstract class GroupRepository {
  abstract create(group: Group): Promise<void>;
  abstract filter(query: GroupQuery): Promise<GroupDto[]>;
}
