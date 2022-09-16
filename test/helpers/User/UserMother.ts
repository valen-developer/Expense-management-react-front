import { SigninDto } from "../../../src/domain/Auth/dtos/Signin.dto";
import { UserSignupDto } from "../../../src/domain/Auth/dtos/UserSignup.dto";
import { UserDto } from "../../../src/domain/User/dtos/User.dto";
import { User } from "../../../src/domain/User/User.model";
import { UserPassword } from "../../../src/domain/User/valueObjects/UserPassword.valueObject";
import { Fakerjs } from "../../../src/infrastructure/vendor/Fakerjs";

const faker = new Fakerjs();

export class UserMother {
  public static random(params?: Partial<UserDto>): User {
    const validDto: UserDto = {
      uuid: faker.uuid(),
      email: faker.email(),
      password: faker.password({
        regex: UserPassword.PASSWORD_REGEX,
      }),
    };

    return new User({
      ...validDto,
      ...params,
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

  public static signinDto(params?: Partial<SigninDto>): SigninDto {
    const validDto: SigninDto = {
      email: faker.email(),
      password: faker.password({
        regex: UserPassword.PASSWORD_REGEX,
      }),
    };

    return {
      ...validDto,
      ...params,
    };
  }
}
