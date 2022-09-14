import { inject, injectable } from "tsyringe";
import { FriendCreatorDto } from "../../domain/Friend/dtos/FriendCreator.dto";
import { Friend } from "../../domain/Friend/Friend.model";
import { FriendRepository } from "../../domain/Friend/interfaces/FriendRepository.interface";
import { UUIDGenerator } from "../../domain/Shared/interfaces/UUIDGenerator.interface";

@injectable()
export class FriendCreator {
  constructor(
    @inject("FriendRepository") private friendRepository: FriendRepository,
    @inject("UUIDGenerator") private uuidGenerator: UUIDGenerator
  ) {}

  public async create(params: FriendCreatorDto): Promise<Friend> {
    const friend = new Friend({
      uuid: this.uuidGenerator.generate(),
      name: params.name,
      user: params.user,
    });

    await this.friendRepository.create(friend);

    return friend;
  }
}
