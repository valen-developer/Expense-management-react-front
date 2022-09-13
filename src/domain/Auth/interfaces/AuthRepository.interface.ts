import { SigninParams, SigninReponse } from "../dtos/Signin.dto";
import { SignupParams } from "../dtos/Signup.dto";

export abstract class AuthRepository {
  abstract signup(params: SignupParams): Promise<void>;
  abstract signin(params: SigninParams): Promise<SigninReponse>;
}
