import { unitDepsRegister } from "../../helpers/unitDepsRegister";

import { container } from "tsyringe";

import { GroupCreator } from "../../../../src/application/Group/GroupCreator";
import { NullException } from "../../../../src/domain/Shared/exceptions/Null.exception";
import { GroupMother } from "../../helpers/Group/GroupMother";
import { DomainDate } from "../../../../src/domain/Shared/valueObjects/DomainDate.valueObject";
import { It, Mock } from "moq.ts";
import { GroupRepository } from "../../../../src/domain/Group/interfaces/GroupRepository.interface";
import { Group } from "../../../../src/domain/Group/Group.model";

describe("Group Creator", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should create a group", async () => {
    const groupCreatorDto = GroupMother.creatorDto();

    const groupCreator = container.resolve(GroupCreator);
    const group = await groupCreator.create(groupCreatorDto);

    expect(group).toBeDefined();
    expect(group.name.value).toBe(groupCreatorDto.name);
    expect(group.user.value).toBe(groupCreatorDto.user);

    const today = new DomainDate(new Date());
    expect(group.createdAt.toYYMMDD()).toBe(today.toYYMMDD());

    expect(group.friends.toArray()).toHaveLength(0);
  });

  it("should create a group width friends", async () => {
    const groupCreatorDto = GroupMother.creatorDto({
      friends: GroupMother.array(3).map((group) => group.uuid.value),
    });

    const groupCreator = container.resolve(GroupCreator);
    const group = await groupCreator.create(groupCreatorDto);

    expect(group).toBeDefined();

    expect(group.friends.length()).toBeGreaterThan(0);
  });

  it("should throw exception if group name is undefined", async () => {
    const groupCreatorDto = GroupMother.creatorDto({
      name: undefined as unknown as string,
    });
    const groupCreator = container.resolve(GroupCreator);

    await expect(groupCreator.create(groupCreatorDto)).rejects.toThrow(
      NullException
    );
  });

  it("should throw exception if group user is empty", async () => {
    const groupCreatorDto = GroupMother.creatorDto({
      user: undefined as unknown as string,
    });
    const groupCreator = container.resolve(GroupCreator);

    await expect(groupCreator.create(groupCreatorDto)).rejects.toThrow(
      NullException
    );
  });
});

const depsRegister = () => {
  const mockedGroupRepository = new Mock<GroupRepository>()
    .setup((instance) => instance.create(It.IsAny<Group>() as Group))
    .returns(Promise.resolve());

  container.register("GroupRepository", {
    useValue: mockedGroupRepository.object(),
  });

  unitDepsRegister();
};
