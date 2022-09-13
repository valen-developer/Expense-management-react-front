import { unitTestingDepsRegister } from "../../helpers/register-dependencies";
import { container } from "tsyringe";

import { UserSigner } from "../../../src/application/Auth/UserSigner";
import { InvalidSigninException } from "../../../src/domain/Auth/exceptions/InvalidSingin.exception";

describe("User Signin", () => {
  beforeAll(() => {
    unitTestingDepsRegister();
  });

  describe("A user that is registered", () => {
    test("should be able to log in if email and password are correct", () => {
      const userSigner = container.resolve<UserSigner>(UserSigner);
      expect(async () => {
        const signinParams = {
          email: "validEmail@email.com",
          password: "Validpassword1",
        };

        const signinReponse = await userSigner
          .signin(signinParams)
          .catch(() => {
            return null;
          });

        if (!signinReponse) {
          throw new InvalidSigninException();
        }

        const { user, token } = signinReponse;

        expect(user).toBeDefined();
        expect(token).toBeDefined();

        expect(user.email.value).toBe(signinParams.email);
      }).not.toThrowError();
    });

    // Hacemos unicamente el test del formato ya que se trata de un test unitario (las excepciones por no coincidir usuario y contraseña se testean en el test de integración)
    test("should not be able to log in if email is incorrect format", async () => {
      const userSigner = container.resolve<UserSigner>(UserSigner);
      await expect(
        userSigner.signin({
          email: "invalidEmail",
          password: "Validpassword1",
        })
      ).rejects.toEqual(new InvalidSigninException());
    });

    test("should not be able to log in if password is incorrect format", async () => {
      const userSigner = container.resolve<UserSigner>(UserSigner);
      await expect(
        userSigner.signin({
          email: "validemail@emial.com",
          password: "invalidpassword",
        })
      ).rejects.toEqual(new InvalidSigninException());
    });
  });
});
