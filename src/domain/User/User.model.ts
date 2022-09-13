import { UUID } from "../Shared/valueObjects/Uuid.valueObject";
import { UserDto } from "./dtos/User.dto";
import { UserEmail } from "./valueObject/UserEmail.valueObject";
import { UserName } from "./valueObject/UserName.valueObject";

export class User {
  public readonly uuid: UUID;
  public readonly email: UserEmail;
  public readonly name: UserName;

  constructor(params: UserDto) {
    this.uuid = new UUID(params.uuid);
    this.email = new UserEmail(params.email);
    this.name = new UserName(params.name);
  }

  public toDto(): UserDto {
    return {
      uuid: this.uuid.value,
      email: this.email.value,
      name: this.name.value,
    };
  }
}
