import { SignupParams } from "../dtos/Signup.dto";

export abstract class AuthRepository {
  abstract signup(params: SignupParams): Promise<void>;
}
