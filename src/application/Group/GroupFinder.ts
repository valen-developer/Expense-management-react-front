import { inject, injectable } from "tsyringe";
import { Group } from "../../domain/Group/Group.model";
import { GroupRepository } from "../../domain/Group/interfaces/GroupRepository.interface";

@injectable()
export class GroupFinder {
  constructor(
    @inject("GroupRepository") private readonly groupRepository: GroupRepository
  ) {}

  async findAllByUser(userUUID: string): Promise<Group[]> {
    return this.groupRepository.findAllByUser(userUUID);
  }
}
