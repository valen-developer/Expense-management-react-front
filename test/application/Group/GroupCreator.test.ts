import { unitTestingDepsRegister } from "../../helpers/register-dependencies";
import { container } from "tsyringe";

import { GroupCreator } from "../../../src/application/Group/GroupCreator";
import { Group } from "../../../src/domain/Group/Group.model";
import { NullException } from "../../../src/domain/Shared/exception/Null.exception";

describe("Group Creator", () => {
  beforeAll(() => {
    unitTestingDepsRegister();
  });

  test("should create a group", () => {
    const groupCreator = container.resolve<GroupCreator>(GroupCreator);

    expect(async () => {
      const groupCreated = await groupCreator.create({
        user: "userUuid",
        name: "Group Name",
      });

      expect(groupCreated).toBeInstanceOf(Group);
      expect(groupCreated.name.value).toBe("Group Name");
      expect(groupCreated.getFriends().length).toEqual(0);
    }).not.toThrowError();
  });

  test("should throw an error when user is not provided", async () => {
    const groupCreator = container.resolve<GroupCreator>(GroupCreator);

    await expect(
      groupCreator.create({
        user: undefined as unknown as string,
        name: "Group Name",
      })
    ).rejects.toEqual(new NullException("UUID cannot be null or undefined"));
  });

  test("should throw an error when name is not provided", async () => {
    const groupCreator = container.resolve<GroupCreator>(GroupCreator);

    await expect(
      groupCreator.create({
        user: "user uuid",
        name: undefined as unknown as string,
      })
    ).rejects.toEqual(
      new NullException("group name cannot be null or undefined")
    );
  });
});
