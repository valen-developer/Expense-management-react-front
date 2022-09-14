import { inject, injectable } from "tsyringe";

import { GroupCreatorDto } from "../../domain/Group/dtos/GroupCreator.dto";
import { Group } from "../../domain/Group/Group.model";
import { GroupRepository } from "../../domain/Group/interfaces/GroupRepository.interface";
import { UUIDGenerator } from "../../domain/Shared/interfaces/UUIDGenerator.interface";

@injectable()
export class GroupCreator {
  constructor(
    @inject("GroupRepository")
    private readonly groupRepository: GroupRepository,
    @inject("UUIDGenerator") private readonly uuidGenerator: UUIDGenerator
  ) {}

  public async create(params: GroupCreatorDto): Promise<Group> {
    const group = new Group({
      uuid: this.uuidGenerator.generate(),
      user: params.user,
      name: params.name,
      friends: params.friends ?? [],
    });

    await this.groupRepository.create(group);

    return group;
  }
}
