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
        beneficiary: faker.uuid(),
        amount: faker.num({ min: 1, max: 1000 }),
        description: faker.paragraph(),
        date: faker.date(),
      };

    return new Payment({ ...defaultParams, ...params });
  }

  public static creatorDto(
    params?: Partial<PaymentCreatorDto>
  ): PaymentCreatorDto {
    const defaultParams: PaymentCreatorDto = {
      group: faker.uuid(),
      payer: faker.uuid(),
      beneficiary: faker.uuid(),
      amount: faker.num({ min: 1, max: 1000 }),
      description: faker.paragraph(),
      date: faker.date(),
    };

    return { ...defaultParams, ...params };
  }
}
