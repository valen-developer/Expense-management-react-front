import { UUID } from "../Shared/valueObjects/Uuid.valueObject";
import { GroupDto } from "./dtos/Group.dto";
import { GroupName } from "./valueObject/GroupName.valueObject";

export class Group {
  public readonly uuid: UUID;
  public readonly user: UUID;
  public readonly name: GroupName;

  private _friends: UUID[] = [];

  constructor(params: GroupDto) {
    this.uuid = new UUID(params.uuid);
    this.user = new UUID(params.user);
    this.name = new GroupName(params.name);
  }

  public getFriends(): string[] {
    return this._friends.map((friend) => friend.value);
  }

  public toDto(): GroupDto {
    return {
      uuid: this.uuid.value,
      user: this.user.value,
      name: this.name.value,
    };
  }
}
