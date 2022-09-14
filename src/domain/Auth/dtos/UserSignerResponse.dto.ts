import { User } from "../../User/User.model";

export interface UserSignerResponseDto {
  user: User;
  token: string;
}
