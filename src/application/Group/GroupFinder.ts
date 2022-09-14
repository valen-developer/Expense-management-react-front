import { inject, injectable } from "tsyringe";
import { GroupFindDto } from "../../domain/Group/dtos/GroupFind.dto";
import { GroupQuery } from "../../domain/Group/dtos/GroupQuery.dto";
import { NotFoundGroupException } from "../../domain/Group/exceptions/NotFoundGroup.exception";
import { Group } from "../../domain/Group/Group.model";
import { GroupRepository } from "../../domain/Group/interfaces/GroupRepository.interface";

@injectable()
export class GroupFinder {
  constructor(
    @inject("GroupRepository") private groupRepository: GroupRepository
  ) {}

  public async filter(query: GroupQuery): Promise<Group[]> {
    return this.groupRepository
      .filter(query)
      .then((g) => g.map((g) => new Group(g)));
  }

  public async find(params: GroupFindDto): Promise<Group> {
    const groups = await this.filter({
      user_equals: params.user,
      uuid_equals: params.uuid,
    });
    const hasGroups = groups.length > 0;

    if (!hasGroups) throw new NotFoundGroupException();

    const group = groups[0];

    return group;
  }
}
