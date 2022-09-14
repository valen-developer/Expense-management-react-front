import { inject, injectable } from "tsyringe";
import { SigninDto } from "../../domain/Auth/dtos/Signin.dto";
import { UserSignerResponseDto } from "../../domain/Auth/dtos/UserSignerResponse.dto";
import { UserRepository } from "../../domain/User/interfaces/UserRepository.interface";
import { UserEmail } from "../../domain/User/valueObjects/UserEmail.valueObject";
import { UserPassword } from "../../domain/User/valueObjects/UserPassword.valueObject";

@injectable()
export class UserSigner {
  constructor(
    @inject("UserRepository") private readonly userRepository: UserRepository
  ) {}

  public async sign(signinDto: SigninDto): Promise<UserSignerResponseDto> {
    this.checkEmail(signinDto.email);
    this.checkPassword(signinDto.password);

    return this.userRepository.signin(signinDto);
  }

  private checkEmail(email: string): void {
    new UserEmail(email);
  }

  private checkPassword(password: string): void {
    new UserPassword(password);
  }
}
