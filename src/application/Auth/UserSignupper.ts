import { inject, injectable } from "tsyringe";

import { UserSignupDto } from "../../domain/Auth/dtos/UserSignup.dto";
import { PasswordConfirmationException } from "../../domain/Auth/exceptions/PasswordConfirmation.exception";
import { UUIDGenerator } from "../../domain/Shared/interfaces/UUIDGenerator.interface";
import { UserRepository } from "../../domain/User/interfaces/UserRepository.interface";
import { User } from "../../domain/User/User.model";

@injectable()
export class UserSignupper {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository,
    @inject("UUIDGenerator") private uuidGenerator: UUIDGenerator
  ) {}

  public async signup(params: UserSignupDto): Promise<void> {
    this.checkPasswordConfirmation(
      params.password,
      params.passwordConfirmation
    );

    const user = new User({
      uuid: this.uuidGenerator.generate(),
      email: params.email,
      password: params.password,
    });

    await this.userRepository.signup(user);
  }

  private checkPasswordConfirmation(
    password: string,
    passwordConfirmation: string
  ): void {
    if (password !== passwordConfirmation) {
      throw new PasswordConfirmationException();
    }
  }
}
