import { GroupDto } from "../../../src/domain/Group/dtos/Group.dto";
import { GroupCreatorDto } from "../../../src/domain/Group/dtos/GroupCreator.dto";
import { Group } from "../../../src/domain/Group/Group.model";
import { Fakerjs } from "../../../src/infrastructure/vendor/Fakerjs";

const faker = new Fakerjs();

export class GroupMother {
  public static random(params?: Partial<GroupDto>): Group {
    const defaultParams: GroupDto = {
      uuid: faker.uuid(),
      user: faker.uuid(),
      name: faker.name(),
      friends: [],
      createdAt: faker.date(),
      updatedAt: faker.date(),
    };

    return new Group({ ...defaultParams, ...params });
  }

  public static array(len = 1, params?: Partial<GroupDto>): Group[] {
    return new Array(len).fill(null).map(() => GroupMother.random(params));
  }

  public static creatorDto(params?: Partial<GroupCreatorDto>): GroupCreatorDto {
    const defaultParams: GroupCreatorDto = {
      user: faker.uuid(),
      name: faker.name(),
      friends: [],
    };

    return { ...defaultParams, ...params };
  }
}
