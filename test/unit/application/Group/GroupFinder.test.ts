import { unitDepsRegister } from "../../helpers/unitDepsRegister";

import { container } from "tsyringe";

import { Expression, It, Mock } from "moq.ts";
import { GroupFinder } from "../../../../src/application/Group/GroupFinder";
import { GroupQuery } from "../../../../src/domain/Group/dtos/GroupQuery.dto";
import { NotFoundGroupException } from "../../../../src/domain/Group/exceptions/NotFoundGroup.exception";
import { GroupRepository } from "../../../../src/domain/Group/interfaces/GroupRepository.interface";
import { GroupMother } from "../../helpers/Group/GroupMother";

const userHasGroupsUuid = "user-uuid-has-groups";
const userHasNotGroupsUuid = "user-uuid-has-not-groups";

const groupThatExistsUuid = "groupThatExistsUuid";
const groupThatDoesNotExistUuid = "groupThatDoesNotExistUuid";

describe("Group Finder", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should find a group give his uuid and user uuid relation", async () => {
    const groupFinder = container.resolve<GroupFinder>(GroupFinder);

    const group = await groupFinder.find({
      user: userHasGroupsUuid,
      uuid: groupThatExistsUuid,
    });

    expect(group).toBeDefined();
    expect(group.uuid.value).toBe(groupThatExistsUuid);
    expect(group.user.value).toBe(userHasGroupsUuid);
  });

  it("should throw an error if the group does not exist", async () => {
    const groupFinder = container.resolve<GroupFinder>(GroupFinder);

    await expect(
      groupFinder.find({
        user: userHasGroupsUuid,
        uuid: groupThatDoesNotExistUuid,
      })
    ).rejects.toThrow(NotFoundGroupException);
  });

  it("should find a list of groups by name contains", async () => {
    const groupFinder = container.resolve<GroupFinder>(GroupFinder);

    const groups = await groupFinder.filter({
      user_equals: userHasGroupsUuid,
      name_contains: "group",
    });

    expect(groups).toBeDefined();
    expect(groups.length).toBeGreaterThan(0);

    groups.forEach((g) => expect(g.user.value).toBe(userHasGroupsUuid));
  });

  it("should get empty array if user has not groups", async () => {
    const groupFinder = container.resolve<GroupFinder>(GroupFinder);

    const groups = await groupFinder.filter({
      user_equals: userHasNotGroupsUuid,
    });

    expect(groups).toBeDefined();

    expect(groups.length).toBe(0);
  });
});

const depsRegister = () => {
  const mockerGroupRepository = new Mock<GroupRepository>()
    .setup((instance) => instance.filter(It.IsAny<GroupQuery>() as GroupQuery))
    .callback((iteration: Expression) => {
      const query = iteration.args[0] as GroupQuery;

      const hasUserGroups = query.user_equals === userHasGroupsUuid;
      const isGroupThatDoesNotExist =
        query.uuid_equals === groupThatDoesNotExistUuid;

      const hasGroups = hasUserGroups && !isGroupThatDoesNotExist;

      if (!hasGroups) return Promise.resolve([]);

      const nameContains = query.name_contains;
      const uuid = query.uuid_equals;

      return Promise.resolve(
        GroupMother.array(3, {
          user: userHasGroupsUuid,
          ...(nameContains && { name: `${nameContains} group` }),
          ...(uuid && { uuid }),
        }).map((g) => g.toDto())
      );
    });

  container.register("GroupRepository", {
    useValue: mockerGroupRepository.object(),
  });

  unitDepsRegister();
};
