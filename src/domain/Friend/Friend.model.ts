import { UUID } from "../Shared/valueObjects/UUID.valueObject";
import { FriendDto } from "./dtos/Friend.dto";
import { FriendName } from "./valueObjects/FriendName.valueObject";

export class Friend {
  public readonly uuid: UUID;
  public readonly user: UUID;
  public readonly name: FriendName;

  constructor(params: FriendDto) {
    this.uuid = new UUID(params.uuid);
    this.user = new UUID(params.user);
    this.name = new FriendName(params.name);
  }

  public toDto(): FriendDto {
    return {
      uuid: this.uuid.value,
      user: this.user.value,
      name: this.name.value,
    };
  }
}
