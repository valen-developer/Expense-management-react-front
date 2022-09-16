import { ExpenseDto } from "../../../src/domain/Expense/dtos/Expense.dto";
import { ExpenseCreatorDto } from "../../../src/domain/Expense/dtos/ExpenseCreatorDto.dto";
import { Expense } from "../../../src/domain/Expense/Expense.model";
import { FriendName } from "../../../src/domain/Friend/valueObjects/FriendName.valueObject";
import { Fakerjs } from "../../../src/infrastructure/vendor/Fakerjs";

const faker = new Fakerjs();

export class ExpenseMother {
  public static random(params?: Partial<ExpenseDto>): Expense {
    const defaultParams: ExpenseDto = {
      uuid: faker.uuid(),
      friend: faker.uuid(),
      friendName: faker.name(FriendName.VALID_NAME_REGEX),
      group: faker.uuid(),
      amount: faker.num({ min: 1, max: 1000 }),
      description: faker.paragraph(),
      createdAt: faker.date(),
      updatedAt: faker.date(),
    };

    return new Expense({ ...defaultParams, ...params });
  }

  public static creatorDto(
    params?: Partial<ExpenseCreatorDto>
  ): ExpenseCreatorDto {
    const defaultParams: ExpenseCreatorDto = {
      friend: faker.uuid(),
      friendName: faker.name(FriendName.VALID_NAME_REGEX),
      group: faker.uuid(),
      amount: faker.num({ min: 1, max: 1000 }),
      description: faker.paragraph(),
    };

    return { ...defaultParams, ...params };
  }

  public static array(len = 3, params?: Partial<ExpenseDto>): Expense[] {
    return Array(len)
      .fill(null)
      .map(() => this.random(params));
  }
}
