import { FriendDto } from "../../../../src/domain/Friend/dtos/Friend.dto";
import { FriendCreatorDto } from "../../../../src/domain/Friend/dtos/FriendCreator.dto";
import { Friend } from "../../../../src/domain/Friend/Friend.model";
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

  public static random(params?: Partial<FriendDto>): Friend {
    const defaultParams: FriendDto = {
      uuid: faker.uuid(),
      name: faker.name(),
      user: faker.uuid(),
    };

    return new Friend({ ...defaultParams, ...params });
  }

  public static array(length = 1, params?: Partial<FriendDto>): Friend[] {
    return Array.from({ length }, () => this.random(params));
  }
}
