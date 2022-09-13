import { inject, injectable } from "tsyringe";
import { FriendCreatorDto } from "../../domain/Friend/dtos/FriendCreator.dto";
import { FriendCreationException } from "../../domain/Friend/exceptions/FriendCreation.exception";
import { Friend } from "../../domain/Friend/Friend.model";
import { FriendRepository } from "../../domain/Friend/interfaces/FriendRepository.interface";
import { UUIDGenerator } from "../../domain/Shared/interfaces/UUIDGenerator.interface";

@injectable()
export class FriendCreator {
  constructor(
    @inject("FriendRepository") private readonly repository: FriendRepository,
    @inject("UUIDGenerator") private readonly uuidGenerator: UUIDGenerator
  ) {}

  public async create(params: FriendCreatorDto): Promise<void> {
    const uuid = this.uuidGenerator.generate();
    const friend = new Friend({
      uuid,
      name: params.name,
      user: params.user,
    });

    try {
      await this.repository.save(friend);
    } catch (error) {
      throw new FriendCreationException();
    }
  }
}
