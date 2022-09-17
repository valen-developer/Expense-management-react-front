import { singleton } from "tsyringe";
import { SigninDto } from "../../domain/Auth/dtos/Signin.dto";
import { UserSignerResponseDto } from "../../domain/Auth/dtos/UserSignerResponse.dto";
import { UserDto } from "../../domain/User/dtos/User.dto";
import { NotFoundUserException } from "../../domain/User/exceptions/NotFoundUser.exception";
import { UserRepository } from "../../domain/User/interfaces/UserRepository.interface";
import { User } from "../../domain/User/User.model";

@singleton()
export class InMemoryUserRepository implements UserRepository {
  private users: UserDto[] = [];

  public signup(user: User): Promise<void> {
    return new Promise((resolve) => {
      this.users.push(user.toDto());
      this.users;
      resolve();
    });
  }
  public signin(params: SigninDto): Promise<UserSignerResponseDto> {
    return new Promise((resolve) => {
      const userDto = this.users.find((user) => user.email === params.email);

      if (!userDto) throw new NotFoundUserException();

      const user = new User(userDto);
      const token = "token";
      resolve({ user, token });
    });
  }
}
