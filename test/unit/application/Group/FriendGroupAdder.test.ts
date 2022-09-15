import { unitDepsRegister } from "../../helpers/unitDepsRegister";
import { container } from "tsyringe";

import { FriendGroupAdder } from "../../../../src/application/Group/FriendGroupAdder";
import { GroupMother } from "../../helpers/Group/GroupMother";
import { NotFoundGroupException } from "../../../../src/domain/Group/exceptions/NotFoundGroup.exception";
import { Expression, It, Mock } from "moq.ts";
import { GroupRepository } from "../../../../src/domain/Group/interfaces/GroupRepository.interface";
import { AddFriendRepositoryDto } from "../../../../src/domain/Group/dtos/AddFriendRepository.dto";

const groupThatDoesNotExistUuid = "groupThatDoesNotExistUuid";

describe("Friend Group Adder", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should add a friend to a group", async () => {
    const friendGroupAdder =
      container.resolve<FriendGroupAdder>(FriendGroupAdder);

    const group = await friendGroupAdder.add({
      group: GroupMother.random({ friends: [] }),
      friendUuid: "friend-uuid",
    });

    expect(group).toBeDefined();
    expect(group.friends.length()).toBeGreaterThan(0);
  });

  it("should throw an error if the group does not exist", async () => {
    const friendGroupAdder =
      container.resolve<FriendGroupAdder>(FriendGroupAdder);

    await expect(
      friendGroupAdder.add({
        group: GroupMother.random({ uuid: groupThatDoesNotExistUuid }),
        friendUuid: "friend-uuid",
      })
    ).rejects.toThrow(NotFoundGroupException);
  });
});

const depsRegister = () => {
  const mockedGroupRepository = new Mock<GroupRepository>()
    .setup((instance) =>
      instance.addFriend(
        It.IsAny<AddFriendRepositoryDto>() as AddFriendRepositoryDto
      )
    )
    .callback((i: Expression) => {
      const params = i.args[0] as AddFriendRepositoryDto;

      const existGroup = params.groupUuid !== groupThatDoesNotExistUuid;
      if (!existGroup) {
        throw new NotFoundGroupException();
      }

      return Promise.resolve();
    });

  container.register("GroupRepository", {
    useValue: mockedGroupRepository.object(),
  });

  unitDepsRegister();
};
