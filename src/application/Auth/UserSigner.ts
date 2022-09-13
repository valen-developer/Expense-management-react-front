import { inject, injectable } from "tsyringe";
import { SigninParams, SigninReponse } from "../../domain/Auth/dtos/Signin.dto";
import { InvalidSigninException } from "../../domain/Auth/exceptions/InvalidSingin.exception";
import { AuthRepository } from "../../domain/Auth/interfaces/AuthRepository.interface";
import { Email } from "../../domain/Shared/valueObjects/Email.valueObject";
import { Password } from "../../domain/Shared/valueObjects/Password.valueObject";

@injectable()
export class UserSigner {
  constructor(
    @inject("AuthRepository") private readonly authRepository: AuthRepository
  ) {}

  public async signin(params: SigninParams): Promise<SigninReponse> {
    try {
      this.checkEmailFormat(params.email);
      this.checkPasswordFormat(params.password);

      return await this.authRepository.signin(params);
    } catch (error) {
      throw new InvalidSigninException();
    }
  }

  private checkEmailFormat(email: string): void {
    new Email(email);
  }

  private checkPasswordFormat(password: string): void {
    new Password(password);
  }
}
