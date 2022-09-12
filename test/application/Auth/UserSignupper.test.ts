import { unitTestingDepsRegister } from "../../helpers/register-dependencies";

import { container } from "tsyringe";
import { UserSignupper } from "../../../src/application/Auth/UserSignupper";
import { InvalidEmailException } from "../../../src/domain/Auth/exceptions/InvalidEmail.exception";
import { InvalidPasswordException } from "../../../src/domain/Auth/exceptions/InvalidPassword.exception";
import { InvalidPasswordConfirmationException } from "../../../src/domain/Auth/exceptions/InvalidPasswordConfirmation.exception";

describe("User signup", () => {
  beforeAll(() => {
    unitTestingDepsRegister();
  });

  test("should be able to signup", () => {
    const signuper = container.resolve<UserSignupper>(UserSignupper);

    expect(signuper).toBeDefined();

    expect(async () => {
      await signuper.signup({
        email: "validemail@emial.com",
        password: "Validpassword1",
        passwordConfirmation: "Validpassword1",
      });
    }).not.toThrowError();
  });

  test("should not be able to signup with invalid email", async () => {
    const signuper = container.resolve<UserSignupper>(UserSignupper);

    expect(signuper).toBeDefined();

    const invalidEmailException = new InvalidEmailException();

    await expect(
      signuper.signup({
        email: "invalidEmail",
        password: "Validpassword1",
        passwordConfirmation: "Validpassword1",
      })
    ).rejects.toEqual(invalidEmailException);
  });

  test("should not be able to signup with invalid password", async () => {
    const signuper = container.resolve<UserSignupper>(UserSignupper);

    expect(signuper).toBeDefined();

    // should throw error
    await expect(
      signuper.signup({
        email: "validemail@email.com",
        password: "invalidpassword",
        passwordConfirmation: "invalidpassword",
      })
    ).rejects.toEqual(new InvalidPasswordException());
  });

  test("should not be able to signup with invalid password confirmation", async () => {
    const signuper = container.resolve<UserSignupper>(UserSignupper);

    expect(signuper).toBeDefined();

    // should throw error
    await expect(
      signuper.signup({
        email: "validemail@email.com",
        password: "ValidPassword1",
        passwordConfirmation: "Validpassword2",
      })
    ).rejects.toEqual(new InvalidPasswordConfirmationException());
  });
});
