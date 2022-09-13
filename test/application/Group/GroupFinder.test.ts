import { unitTestingDepsRegister } from "../../helpers/register-dependencies";
import { container } from "tsyringe";

import { GroupCreator } from "../../../src/application/Group/GroupCreator";
import { GroupFinder } from "../../../src/application/Group/GroupFinder";

const userUUID = "user-1234";

describe("Group finder", () => {
  beforeAll(async () => {
    unitTestingDepsRegister();
    const groupCreator = container.resolve<GroupCreator>(GroupCreator);

    await groupCreator.create({
      name: "Group 1",
      user: userUUID,
    });
  });

  test("should found all group by user uuid", async () => {
    const groupFinder = container.resolve<GroupFinder>(GroupFinder);
    const groups = await groupFinder.findAllByUser(userUUID);

    expect(groups).toHaveLength(1);
  });
});
