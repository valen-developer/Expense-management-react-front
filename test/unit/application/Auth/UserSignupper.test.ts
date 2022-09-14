import { unitDepsRegister } from "../../helpers/unitDepsRegister";

import { It, Mock } from "moq.ts";
import { container } from "tsyringe";

import { UserSignupper } from "../../../../src/application/Auth/UserSignupper";
import { PasswordConfirmationException } from "../../../../src/domain/Auth/exceptions/PasswordConfirmation.exception";
import { UserAlreadyExistsException } from "../../../../src/domain/Auth/exceptions/UserAlreadyExists.exception";
import { InvalidEmailException } from "../../../../src/domain/Shared/exceptions/InvalidEmail.exception";
import { InvalidPasswordException } from "../../../../src/domain/User/exceptions/InvalidPassword.exception";
import { UserRepository } from "../../../../src/domain/User/interfaces/UserRepository.interface";
import { User } from "../../../../src/domain/User/User.model";
import { UserMother } from "../../helpers/User/UserMother";

describe("User Signupper", () => {
  beforeAll(() => {
    registerDeps();
  });

  it("should be able to sign up a user", async () => {
    const userDto = UserMother.signupDto();
    const userSignupper = container.resolve<UserSignupper>(UserSignupper);

    await expect(userSignupper.signup(userDto)).resolves.not.toThrow();
  });

  it("should not be able to sign up a user with an existing email", async () => {
    const userDto = UserMother.signupDto({ email: "alreadyExist@email.com" });
    const userSignupper = container.resolve<UserSignupper>(UserSignupper);

    await expect(userSignupper.signup(userDto)).rejects.toThrow(
      UserAlreadyExistsException
    );
  });

  it("should not be able to sign up a user with an invalid email", async () => {
    const userDto = UserMother.signupDto({
      email: "invalid-email",
    });
    const userSignupper = container.resolve<UserSignupper>(UserSignupper);

    await expect(userSignupper.signup(userDto)).rejects.toThrow(
      InvalidEmailException
    );
  });

  it("should not be able to sign up a user with an invalid password", async () => {
    const userDto = UserMother.signupDto({
      password: "invalid-password",
      passwordConfirmation: "invalid-password",
    });
    const userSignupper = container.resolve<UserSignupper>(UserSignupper);

    await expect(userSignupper.signup(userDto)).rejects.toThrow(
      InvalidPasswordException
    );
  });

  it("should not be able to sign up a user with a different password confirmation", async () => {
    const userDto = UserMother.signupDto({
      passwordConfirmation: "different-password",
    });
    const userSignupper = container.resolve<UserSignupper>(UserSignupper);

    await expect(userSignupper.signup(userDto)).rejects.toThrow(
      PasswordConfirmationException
    );
  });
});

const registerDeps = () => {
  const mockUserRepository = new Mock<UserRepository>()
    .setup((instance) => instance.signup(It.IsAny<User>() as User))
    .returns(Promise.resolve())
    .setup((instance) =>
      instance.signup(
        It.Is<User>((user) => {
          const exist = user.email.value === "alreadyExist@email.com";

          return exist;
        }) as User
      )
    )
    .returns(Promise.reject(new UserAlreadyExistsException()))
    .object();

  container.register("UserRepository", {
    useValue: mockUserRepository,
  });

  unitDepsRegister();
};
