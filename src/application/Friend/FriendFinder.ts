import { inject, injectable } from "tsyringe";
import { FriendFindDto } from "../../domain/Friend/dtos/FriendFind.dto";
import { FriendQuery } from "../../domain/Friend/dtos/FriendQuery.dto";
import { NotFoundFriendException } from "../../domain/Friend/exceptions/NotFoundFriend.exception";
import { Friend } from "../../domain/Friend/Friend.model";
import { FriendRepository } from "../../domain/Friend/interfaces/FriendRepository.interface";

@injectable()
export class FriendFinder {
  constructor(
    @inject("FriendRepository")
    private readonly friendRepository: FriendRepository
  ) {}

  public async filter(query: FriendQuery): Promise<Friend[]> {
    const friendDtos = await this.friendRepository.filter(query);

    return friendDtos.map((friendDto) => new Friend(friendDto));
  }

  public async find(params: FriendFindDto): Promise<Friend> {
    const friendArray = await this.filter({
      user_equals: params.user,
      uuid_equals: params.uuid,
    });

    const hasFriend = friendArray.length > 0;

    if (!hasFriend) throw new NotFoundFriendException();

    const friend = friendArray[0];

    return friend;
  }
}
