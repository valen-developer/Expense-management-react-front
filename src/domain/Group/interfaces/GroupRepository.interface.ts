import { Group } from "../Group.model";

export abstract class GroupRepository {
  abstract create(group: Group): Promise<void>;
}
