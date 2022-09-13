import { inject, injectable } from "tsyringe";
import { GroupCreatorParams } from "../../domain/Group/dtos/GroupCreatorParams.dto";
import { Group } from "../../domain/Group/Group.model";
import { GroupRepository } from "../../domain/Group/interfaces/GroupRepository.interface";
import { UUIDGenerator } from "../../domain/Shared/interfaces/UUIDGenerator.interface";

@injectable()
export class GroupCreator {
  constructor(
    @inject("GroupRepository") private readonly repository: GroupRepository,
    @inject("UUIDGenerator") private readonly uuidGenerator: UUIDGenerator
  ) {}

  public async create(params: GroupCreatorParams): Promise<Group> {
    const group = new Group({
      uuid: this.uuidGenerator.generate(),
      ...params,
    });

    return await this.repository.create(group);
  }
}
