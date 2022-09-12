import { inject, injectable } from "tsyringe";

import { SignupParams } from "../../domain/Auth/dtos/Signup.dto";

import { Email } from "../../domain/Shared/valueObjects/Email.valueObject";
import { Password } from "../../domain/Shared/valueObjects/Password.valueObject";

import { AuthRepository } from "../../domain/Auth/interfaces/AuthRepository.interface";

import { InvalidPasswordConfirmationException } from "../../domain/Auth/exceptions/InvalidPasswordConfirmation.exception";

@injectable()
export class UserSignupper {
  constructor(
    @inject("AuthRepository") private readonly authRepository: AuthRepository
  ) {}

  public async signup(params: SignupParams): Promise<void> {
    const { email, password, passwordConfirmation } = params;

    this.checkEmailFormat(email);
    this.checkPasswordFormat(password);
    this.checkPasswordConfirmation(password, passwordConfirmation);

    await this.authRepository.signup(params);
  }

  private checkEmailFormat(email: string): void {
    new Email(email);
  }

  private checkPasswordFormat(password: string): void {
    new Password(password);
  }

  private checkPasswordConfirmation(
    password: string,
    passwordConfirmation: string
  ): void {
    const isSameConfirmation = password === passwordConfirmation;

    if (!isSameConfirmation) {
      throw new InvalidPasswordConfirmationException();
    }
  }
}
