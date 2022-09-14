import { UUID } from "../Shared/valueObjects/UUID.valueObject";
import { UserDto } from "./dtos/User.dto";
import { UserEmail } from "./valueObjects/UserEmail.valueObject";
import { UserPassword } from "./valueObjects/UserPassword.valueObject";

export class User {
  public readonly uuid: UUID;
  public readonly email: UserEmail;
  public readonly password: UserPassword;

  constructor(params: UserDto) {
    this.uuid = new UUID(params.uuid);
    this.email = new UserEmail(params.email);
    this.password = new UserPassword(params.password);
  }

  public toDto(): UserDto {
    return {
      uuid: this.uuid.value,
      email: this.email.value,
      password: this.password.value,
    };
  }
}
