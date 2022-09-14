import { unitDepsRegister } from "../../helpers/unitDepsRegister";

import { container } from "tsyringe";
import { Expression, It, Mock } from "moq.ts";

import { UserSigner } from "../../../../src/application/Auth/UserSigner";
import { SigninDto } from "../../../../src/domain/Auth/dtos/Signin.dto";
import { SigninException } from "../../../../src/domain/Auth/exceptions/SigninException.exception";
import { InvalidEmailException } from "../../../../src/domain/Shared/exceptions/InvalidEmail.exception";
import { InvalidPasswordException } from "../../../../src/domain/User/exceptions/InvalidPassword.exception";
import { UserRepository } from "../../../../src/domain/User/interfaces/UserRepository.interface";
import { User } from "../../../../src/domain/User/User.model";
import { UserMother } from "../../helpers/User/UserMother";

describe("User Signer", () => {
  beforeAll(() => {
    registerDeps();
  });

  it("should sign a user and get a user and token", async () => {
    const userSignerDto = UserMother.signinDto();

    const userSigner = container.resolve<UserSigner>(UserSigner);

    const { user, token } = await userSigner.sign(userSignerDto);

    expect(user).toBeDefined();
    expect(token).toBeDefined();

    // expect user to be type of User
    expect(user).toBeInstanceOf(User);

    // expect token to be type of string
    expect(typeof token).toBe("string");

    // expect user email to be equal to userSignerDto email
    expect(user.email.value).toBe(userSignerDto.email);
  });

  it("should throw an error if is invalid password", async () => {
    const userSignerDto = UserMother.signinDto({
      password: "invalidPassword",
    });

    const userSigner = container.resolve<UserSigner>(UserSigner);

    // expect to throw an error
    await expect(userSigner.sign(userSignerDto)).rejects.toThrowError(
      InvalidPasswordException
    );
  });

  it("should throw an error if is invalid email", async () => {
    const userSignerDto = UserMother.signinDto({
      email: "invalidEmail",
    });

    const userSigner = container.resolve<UserSigner>(UserSigner);

    // expect to throw an error
    await expect(userSigner.sign(userSignerDto)).rejects.toThrowError(
      InvalidEmailException
    );
  });

  it("should throw an error if the user is not found", async () => {
    const userSignerDto = UserMother.signinDto({
      email: "notFound@email.com",
    });

    const userSigner = container.resolve<UserSigner>(UserSigner);

    // expect to throw an error
    await expect(userSigner.sign(userSignerDto)).rejects.toThrowError(
      SigninException
    );
  });
});

const registerDeps = () => {
  const mockUserRepository = new Mock<UserRepository>()
    .setup((instance) => instance.signin(It.IsAny<SigninDto>() as SigninDto))
    .callback((iteration: Expression) => {
      const { email } = iteration.args[0] as SigninDto;

      const isNotFound = email === "notFound@email.com";

      if (isNotFound) return Promise.reject(new SigninException());

      return Promise.resolve({
        user: UserMother.random({ email }),
        token: "token",
      });
    })
    .object();

  container.register("UserRepository", {
    useValue: mockUserRepository,
  });

  unitDepsRegister();
};
