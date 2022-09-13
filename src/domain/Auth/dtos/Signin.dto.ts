import { User } from "../../User/User.model";

export interface SigninParams {
  email: string;
  password: string;
}

export interface SigninReponse {
  user: User;
  token?: string;
}
