import { FriendName } from "../../../../src/domain/Friend/valueObjects/FriendName.valueObject";
import { PaymentDto } from "../../../../src/domain/Payment/dtos/Payment.dto";
import { PaymentCreatorDto } from "../../../../src/domain/Payment/dtos/PaymentCreator.dto";
import { Payment } from "../../../../src/domain/Payment/Payment.model";
import { WithOptionals } from "../../../../src/domain/Shared/types/WithOptionals.type";
import { Fakerjs } from "../../../../src/infrastructure/vendor/Fakerjs";

const faker = new Fakerjs();

export class PaymentMother {
  public static random(params?: Partial<PaymentDto>): Payment {
    const defaultParams: WithOptionals<PaymentDto, "createdAt" | "updatedAt"> =
      {
        uuid: faker.uuid(),
        group: faker.uuid(),
        payer: faker.uuid(),
        payerName: faker.name(FriendName.VALID_NAME_REGEX),
        beneficiary: faker.uuid(),
        beneficiaryName: faker.name(FriendName.VALID_NAME_REGEX),
        amount: faker.num({ min: 1, max: 1000 }),
        description: faker.paragraph(),
        date: faker.date(),
      };

    return new Payment({ ...defaultParams, ...params });
  }

  public static array(len = 3, params?: Partial<PaymentDto>): Payment[] {
    return Array.from({ length: len }, () => this.random(params));
  }

  public static creatorDto(
    params?: Partial<PaymentCreatorDto>
  ): PaymentCreatorDto {
    const defaultParams: PaymentCreatorDto = {
      group: faker.uuid(),
      payer: faker.uuid(),
      payerName: faker.name(FriendName.VALID_NAME_REGEX),
      beneficiary: faker.uuid(),
      beneficiaryName: faker.name(FriendName.VALID_NAME_REGEX),
      amount: faker.num({ min: 1, max: 1000 }),
      description: faker.paragraph(),
      date: faker.date(),
    };

    return { ...defaultParams, ...params };
  }
}
