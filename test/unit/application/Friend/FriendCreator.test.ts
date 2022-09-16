import { unitDepsRegister } from "../../helpers/unitDepsRegister";

import { container } from "tsyringe";
import { NullException } from "../../../../src/domain/Shared/exceptions/Null.exception";
import { It, Mock } from "moq.ts";
import { FriendCreator } from "../../../../src/application/Friend/FriendCreator";
import { FriendMother } from "../../../helpers/Friend/FriendMother";
import { Friend } from "../../../../src/domain/Friend/Friend.model";
import { FriendNameInvalidException } from "../../../../src/domain/Friend/exceptions/FriendNameInvalid.exception";
import { FriendNameAlreadyExistException } from "../../../../src/domain/Friend/exceptions/FriendNameAlreadyExist.exception";
import { FriendRepository } from "../../../../src/domain/Friend/interfaces/FriendRepository.interface";

describe("Friend Creator", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should create a friend", async () => {
    const friendCreatorDto = FriendMother.creatorDto({
      name: "Valid Name",
    });
    const friendCreator = container.resolve<FriendCreator>(FriendCreator);

    const friend = await friendCreator.create(friendCreatorDto);

    expect(friend).toBeDefined();
    expect(friend).toBeInstanceOf(Friend);

    expect(friend.name.value).toBe(friendCreatorDto.name);

    // expect friend-user relation to be defined
    expect(friend.user.value).toBe(friendCreatorDto.user);
  });

  it("should throw an error if is invalid name", async () => {
    const friendCreatorDto = FriendMother.creatorDto({ name: "1" });

    const friendCreator = container.resolve<FriendCreator>(FriendCreator);

    await expect(friendCreator.create(friendCreatorDto)).rejects.toThrowError(
      FriendNameInvalidException
    );
  });

  it("should throw an error if is undefined name", async () => {
    const friendCreatorDto = FriendMother.creatorDto({
      name: undefined as unknown as string,
    });

    const friendCreator = container.resolve<FriendCreator>(FriendCreator);

    await expect(friendCreator.create(friendCreatorDto)).rejects.toThrowError(
      NullException
    );
  });

  it("should throw an error if is undefined user", async () => {
    const friendCreatorDto = FriendMother.creatorDto({
      user: undefined as unknown as string,
    });

    const friendCreator = container.resolve<FriendCreator>(FriendCreator);

    await expect(friendCreator.create(friendCreatorDto)).rejects.toThrowError(
      NullException
    );
  });

  it("should throw an error if is friend name already exist", async () => {
    const friendCreatorDto = FriendMother.creatorDto({
      name: "already exist",
    });

    const friendCreator = container.resolve<FriendCreator>(FriendCreator);

    await expect(friendCreator.create(friendCreatorDto)).rejects.toThrowError(
      FriendNameAlreadyExistException
    );
  });
});

const depsRegister = () => {
  const mockedFriendRepository = new Mock<FriendRepository>()
    .setup((instance) => instance.create(It.IsAny<Friend>() as Friend))
    .returns(Promise.resolve())

    .setup((instance) =>
      instance.create(
        It.Is<Friend>(
          (friend) => friend.name.value === "already exist"
        ) as Friend
      )
    )
    .returns(Promise.reject(new FriendNameAlreadyExistException()))
    .object();

  container.register<FriendRepository>("FriendRepository", {
    useValue: mockedFriendRepository,
  });

  unitDepsRegister();
};
