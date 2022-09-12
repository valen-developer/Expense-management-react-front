import { SignupParams } from "../../../src/domain/Auth/dtos/Signup.dto";
import { AuthRepository } from "../../../src/domain/Auth/interfaces/AuthRepository.interface";

// desactivate ts lint for unused vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class MockedAuthRepository implements AuthRepository {
  public async signup(params: SignupParams): Promise<void> {
    return Promise.resolve();
  }
}
