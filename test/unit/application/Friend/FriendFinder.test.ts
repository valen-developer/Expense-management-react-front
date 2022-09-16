import { unitDepsRegister } from "../../helpers/unitDepsRegister";

import { Expression, It, Mock } from "moq.ts";
import { container } from "tsyringe";

import { FriendFinder } from "../../../../src/application/Friend/FriendFinder";
import { FriendQuery } from "../../../../src/domain/Friend/dtos/FriendQuery.dto";
import { NotFoundFriendException } from "../../../../src/domain/Friend/exceptions/NotFoundFriend.exception";
import { FriendRepository } from "../../../../src/domain/Friend/interfaces/FriendRepository.interface";
import { FriendMother } from "../../../helpers/Friend/FriendMother";

const userHasFriendUuid = "user-uuid-has-friend";
const userHasNotFriendUuid = "user-uuid-has-not-friend";

describe("Friend Finder", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should find a friend give his uuid and user uuid relation", async () => {
    const friendFinder = container.resolve(FriendFinder);
    const friend = await friendFinder.find({
      user: userHasFriendUuid,
      uuid: "friend-uuid",
    });
    expect(friend).toBeDefined();

    expect(friend.uuid.value).toBe("friend-uuid");
  });

  it("should throw exception if friend is not found", async () => {
    const friendFinder = container.resolve(FriendFinder);
    await expect(
      friendFinder.find({
        user: userHasNotFriendUuid,
        uuid: "not-found-friend-uuid",
      })
    ).rejects.toThrow(NotFoundFriendException);
  });

  it("should get an array of friends given a user uuid", async () => {
    const userUuid = userHasFriendUuid;

    const friendFinder = container.resolve(FriendFinder);
    const friends = await friendFinder.filter({
      user_equals: userUuid,
    });
    expect(friends).toBeDefined();
    expect(friends.length).toBeGreaterThan(0);

    // expect that friends have the same user uuid
    friends.forEach((f) => expect(f.user.value).toBe(userUuid));
  });

  it("should get an empty array if user has no friends", async () => {
    const userUuid = userHasNotFriendUuid;

    const friendFinder = container.resolve(FriendFinder);
    const friends = await friendFinder.filter({
      user_equals: userUuid,
    });
    expect(friends).toBeDefined();
    expect(friends.length).toBe(0);
  });

  it("should get an array of friend that name contains", async () => {
    const userUuid = userHasFriendUuid;

    const friendFinder = container.resolve(FriendFinder);
    const friends = await friendFinder.filter({
      user_equals: userUuid,
      name_contains: "friend",
    });
    expect(friends).toBeDefined();
    expect(friends.length).toBeGreaterThan(0);

    friends.forEach((f) => expect(f.name.value).toContain("friend"));
  });
});

const depsRegister = () => {
  const mockerFriendRepository = new Mock<FriendRepository>()
    // Set filter method
    .setup((instance) =>
      instance.filter(It.IsAny<FriendQuery>() as FriendQuery)
    )
    .callback((iteration: Expression) => {
      const query = iteration.args[0] as FriendQuery;

      const has = query.user_equals === userHasFriendUuid;
      if (!has) return Promise.resolve([]);

      const nameContains = query.name_contains;
      const uuid = query.uuid_equals;

      return Promise.resolve(
        FriendMother.array(3, {
          user: userHasFriendUuid,
          ...(nameContains && { name: `${nameContains} friend` }),
          ...(uuid && { uuid }),
        }).map((f) => f.toDto())
      );
    });

  container.register<FriendRepository>("FriendRepository", {
    useValue: mockerFriendRepository.object(),
  });

  unitDepsRegister();
};
