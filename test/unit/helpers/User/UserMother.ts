import { UserSignupDto } from "../../../../src/domain/Auth/dtos/UserSignup.dto";
import { User } from "../../../../src/domain/User/User.model";
import { UserPassword } from "../../../../src/domain/User/valueObjects/UserPassword.valueObject";
import { Fakerjs } from "../../../../src/infrastructure/vendor/Fakerjs";

const faker = new Fakerjs();

export class UserMother {
  public create(): User {
    return new User({
      uuid: faker.uuid(),
      email: faker.email(),
      password: faker.password({
        regex: UserPassword.PASSWORD_REGEX,
      }),
    });
  }

  public static signupDto(params?: Partial<UserSignupDto>): UserSignupDto {
    const password = faker.password({
      regex: UserPassword.PASSWORD_REGEX,
    });

    const validDto: UserSignupDto = {
      email: faker.email(),
      password,
      passwordConfirmation: password,
    };

    return {
      ...validDto,
      ...params,
    };
  }
}
