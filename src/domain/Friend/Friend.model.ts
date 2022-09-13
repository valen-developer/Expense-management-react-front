import { UUID } from "../Shared/valueObjects/Uuid.valueObject";
import { FriendDto } from "./dtos/Friend.dto";
import { FriendName } from "./valueObject/FriendName.valueObject";

export class Friend {
  public readonly uuid: UUID;
  public readonly name: FriendName;
  public readonly user: UUID;

  constructor(params: FriendDto) {
    this.uuid = new UUID(params.uuid);
    this.name = new FriendName(params.name);
    this.user = new UUID(params.user);
  }

  public toDto(): FriendDto {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      user: this.user.value,
    };
  }
}
