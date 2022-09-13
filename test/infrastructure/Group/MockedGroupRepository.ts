import { Group } from "../../../src/domain/Group/Group.model";
import { GroupRepository } from "../../../src/domain/Group/interfaces/GroupRepository.interface";

export class MockedGroupRepository implements GroupRepository {
  private groups: Group[] = [];

  public async create(group: Group): Promise<Group> {
    return new Promise((resolve) => {
      this.groups.push(group);
      resolve(group);
    });
  }
}
