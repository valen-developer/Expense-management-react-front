import { unitDepsRegister } from "../../helpers/unitDepsRegister";
import { Expression, It, Mock } from "moq.ts";
import { container } from "tsyringe";

import { FriendGroupFinder } from "../../../../src/application/Group/FriendGroupFinder";
import { GroupRepository } from "../../../../src/domain/Group/interfaces/GroupRepository.interface";
import { FriendMother } from "../../helpers/Friend/FriendMother";

const groupWithFriendsUuid = "groupWithFriendsUuid";
const groupWithoutFriendsUuid = "groupWithoutFriendsUuid";

describe("Friend Group Finder", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should get a not empty array of friend given a group uuid with friends", async () => {
    const friendGroupFinder =
      container.resolve<FriendGroupFinder>(FriendGroupFinder);

    const friends = await friendGroupFinder.find(groupWithFriendsUuid);

    expect(friends).toBeDefined();

    expect(friends.length).toBeGreaterThan(0);
  });

  it("should get an empty array of friend given a group uuid without friends", async () => {
    const friendGroupFinder =
      container.resolve<FriendGroupFinder>(FriendGroupFinder);

    const friends = await friendGroupFinder.find(groupWithoutFriendsUuid);

    expect(friends).toBeDefined();

    expect(friends.length).toBe(0);
  });
});

const depsRegister = () => {
  const mockedGroupRepository = new Mock<GroupRepository>()
    .setup((instance) => instance.findFriends(It.IsAny<string>() as string))
    .callback((i: Expression) => {
      const groupUuid = i.args[0] as string;

      const hasNotFriends = groupUuid === groupWithoutFriendsUuid;
      if (hasNotFriends) {
        return Promise.resolve([]);
      }

      return Promise.resolve(FriendMother.array(3).map((f) => f.toDto()));
    });

  container.register("GroupRepository", {
    useValue: mockedGroupRepository.object(),
  });

  unitDepsRegister();
};
