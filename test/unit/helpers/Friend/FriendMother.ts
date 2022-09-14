import { FriendCreatorDto } from "../../../../src/domain/Friend/dtos/FriendCreator.dto";
import { Fakerjs } from "../../../../src/infrastructure/vendor/Fakerjs";

const faker = new Fakerjs();

export class FriendMother {
  public static creatorDto(
    params?: Partial<FriendCreatorDto>
  ): FriendCreatorDto {
    const defaultParams: FriendCreatorDto = {
      name: faker.name(),
      user: faker.uuid(),
    };

    return { ...defaultParams, ...params };
  }
}
