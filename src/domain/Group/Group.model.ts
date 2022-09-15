import { Dated } from "../Shared/Dated.model";
import { WithOptionals } from "../Shared/types/WithOptionals.type";
import { UUID } from "../Shared/valueObjects/UUID.valueObject";
import { GroupDto } from "./dtos/Group.dto";
import { GroupFriendList } from "./valeuObjects/GroupFriendList.valueObjet";
import { GroupName } from "./valeuObjects/GroupName.valueObject";

export class Group extends Dated {
  public readonly uuid: UUID;
  public readonly user: UUID;
  public readonly name: GroupName;
  public readonly friends: GroupFriendList;

  constructor(params: WithOptionals<GroupDto, "createdAt" | "updatedAt">) {
    const { createdAt, updatedAt } = params;
    super({ createdAt, updatedAt });

    this.uuid = new UUID(params.uuid);
    this.user = new UUID(params.user);
    this.name = new GroupName(params.name);
    this.friends = new GroupFriendList(params.friends);
  }

  public toDto(): GroupDto {
    return {
      uuid: this.uuid.value,
      user: this.user.value,
      name: this.name.value,
      friends: this.friends.toArray(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  public addFriend(friendUuid: string): void {
    this.friends.push(friendUuid);
  }
}
