import { SigninDto } from "../../Auth/dtos/Signin.dto";
import { UserSignerResponseDto } from "../../Auth/dtos/UserSignerResponse.dto";
import { User } from "../User.model";

export abstract class UserRepository {
  abstract signup(user: User): Promise<void>;
  abstract signin(params: SigninDto): Promise<UserSignerResponseDto>;
}
