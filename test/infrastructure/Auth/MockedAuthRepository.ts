import {
  SigninParams,
  SigninReponse,
} from "../../../src/domain/Auth/dtos/Signin.dto";
import { SignupParams } from "../../../src/domain/Auth/dtos/Signup.dto";
import { AuthRepository } from "../../../src/domain/Auth/interfaces/AuthRepository.interface";
import { UserDto } from "../../../src/domain/User/dtos/User.dto";
import { User } from "../../../src/domain/User/User.model";

export class MockedAuthRepository implements AuthRepository {
  private users: UserDtoWithPassword[] = [
    {
      uuid: "1234-abcd-5678-efgh",
      email: "validEmail@email.com",
      name: "validEmail",
      password: "Validpassword1",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async signup(params: SignupParams): Promise<void> {
    return Promise.resolve();
  }

  public signin(params: SigninParams): Promise<SigninReponse> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((user) => user.email === params.email);

      if (!user) {
        reject(new Error("User not found"));
      }

      const passwordMatch = user?.password === params.password;

      if (!passwordMatch) {
        reject(new Error("Password does not match"));
      }

      resolve({
        user: new User(user as UserDto),
        token: "token",
      });
    });
  }
}

interface UserDtoWithPassword extends UserDto {
  password: string;
}
