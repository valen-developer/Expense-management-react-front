import { singleton } from "tsyringe";
import { Group } from "../../../src/domain/Group/Group.model";
import { GroupRepository } from "../../../src/domain/Group/interfaces/GroupRepository.interface";
import { UUID } from "../../../src/domain/Shared/valueObjects/Uuid.valueObject";

@singleton()
export class MockedGroupRepository implements GroupRepository {
  private groups: Group[] = [];

  public async create(group: Group): Promise<Group> {
    return new Promise((resolve) => {
      this.groups.push(group);
      resolve(group);
    });
  }

  public async findAllByUser(userUUID: string): Promise<Group[]> {
    return new Promise((resolve) => {
      const groups = this.groups.filter((group) =>
        group.user.equals(new UUID(userUUID))
      );
      resolve(groups);
    });
  }
}
