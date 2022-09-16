import { unitDepsRegister } from "../../helpers/unitDepsRegister";
import { container } from "tsyringe";

import { PaymentFinder } from "../../../../src/application/Payment/PaymentFinder";
import { Payment } from "../../../../src/domain/Payment/Payment.model";
import { Expression, It, Mock } from "moq.ts";
import { PaymentRepository } from "../../../../src/domain/Payment/interfaces/PaymentRepository.interface";
import { PaymentQuery } from "../../../../src/domain/Payment/dtos/PaymentQuery.dto";
import { PaymentMother } from "../../../helpers/Payment/PaymentMother";

const groupWithPaymentsUuid = "validGroupUuid";
const groupWithoutPaymentsUuid = "invalidGroupUuid";

describe("Payment Finder", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should find a not empty array of payment given a valid group", async () => {
    const paymentFinder = container.resolve<PaymentFinder>(PaymentFinder);

    const payments = await paymentFinder.findByGroup(groupWithPaymentsUuid);

    expect(payments).toBeInstanceOf(Array);
    expect(payments.length).toBeGreaterThan(0);

    payments.forEach((payment) => {
      expect(payment).toBeInstanceOf(Payment);
      expect(payment.group.value).toBe(groupWithPaymentsUuid);
    });
  });

  it("should find an empty array of payment given an invalid group", async () => {
    const paymentFinder = container.resolve<PaymentFinder>(PaymentFinder);

    const payments = await paymentFinder.findByGroup(groupWithoutPaymentsUuid);

    expect(payments).toBeInstanceOf(Array);
    expect(payments.length).toBe(0);
  });
});

const depsRegister = () => {
  const mockerPaymentRepository = new Mock<PaymentRepository>()
    .setup((instance) =>
      instance.filter(It.IsAny<PaymentQuery>() as PaymentQuery)
    )
    .callback((i: Expression) => {
      const query = i.args[0] as PaymentQuery;

      const groupUuid = query.group_equals;
      const isEmpty = groupUuid === groupWithoutPaymentsUuid;
      if (isEmpty) return Promise.resolve([]);

      return Promise.resolve(
        PaymentMother.array(3, {
          ...(groupUuid && { group: groupUuid }),
        }).map((p) => p.toDto())
      );
    });

  container.register("PaymentRepository", {
    useValue: mockerPaymentRepository.object(),
  });

  unitDepsRegister();
};
