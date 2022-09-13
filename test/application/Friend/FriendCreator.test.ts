import { unitTestingDepsRegister } from "../../helpers/register-dependencies";
import { container } from "tsyringe";

import { FriendCreator } from "../../../src/application/Friend/FriendCreator";
import { NullException } from "../../../src/domain/Shared/exception/Null.exception";
import { FriendCreationException } from "../../../src/domain/Friend/exceptions/FriendCreation.exception";

describe("Friend Creator", () => {
  beforeAll(() => {
    unitTestingDepsRegister();
  });

  test("Should be able to create a new friend", () => {
    const friendCreator = container.resolve<FriendCreator>(FriendCreator);

    expect(async () => {
      await friendCreator.create({
        name: "Friend 1",
        user: "user-1234",
      });
    }).not.toThrow();
  });

  test("Should not be able to create a new friend with same name", async () => {
    const friendCreator = container.resolve<FriendCreator>(FriendCreator);

    await friendCreator.create({
      name: "Friend 12",
      user: "user-1234",
    });

    await expect(
      friendCreator.create({
        name: "Friend 12",
        user: "user-1234",
      })
    ).rejects.toEqual(new FriendCreationException());
  });

  test("Should not be able to create a new friend without name", async () => {
    const friendCreator = container.resolve<FriendCreator>(FriendCreator);

    await expect(
      friendCreator.create({
        name: undefined as unknown as string,
        user: "user-1234",
      })
    ).rejects.toEqual(
      new NullException("Friend name cannot be null or undefined")
    );
  });

  test("Should not be able to create a new friend user which belong", async () => {
    const friendCreator = container.resolve<FriendCreator>(FriendCreator);

    await expect(
      friendCreator.create({
        name: "Friend 2",
        user: undefined as unknown as string,
      })
    ).rejects.toEqual(new NullException("UUID cannot be null or undefined"));
  });
});
