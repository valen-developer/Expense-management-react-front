import { unitDepsRegister } from "../../helpers/unitDepsRegister";
import { container } from "tsyringe";

import { Expression, It, Mock } from "moq.ts";
import { PaymentCreator } from "../../../../src/application/Payment/PaymentCreator";
import { InvalidAmountException } from "../../../../src/domain/Expense/exceptions/InvalidAmount.exception";
import { NotFoundGroupException } from "../../../../src/domain/Group/exceptions/NotFoundGroup.exception";
import { PaymentRepository } from "../../../../src/domain/Payment/interfaces/PaymentRepository.interface";
import { Payment } from "../../../../src/domain/Payment/Payment.model";
import { DomainDate } from "../../../../src/domain/Shared/valueObjects/DomainDate.valueObject";
import { NotFoundUserException } from "../../../../src/domain/User/exceptions/NotFoundUser.exception";
import { PaymentMother } from "../../helpers/Payment/PaymentMother";

const invalidGroupUuid = "invalidGroupUuid";
const invalidPayerUuid = "invalidPayerUuid";
const invalidBeneficiaryUuid = "invalidPayeeUuid";

describe("Payment Creator", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should create a payment given a group, payer and beneficiary valid", async () => {
    const paymentCreatorDto = PaymentMother.creatorDto();

    const paymentCreator = container.resolve<PaymentCreator>(PaymentCreator);

    const payment = await paymentCreator.create(paymentCreatorDto);

    expect(payment).toBeInstanceOf(Payment);
    expect(payment.group.value).toEqual(paymentCreatorDto.group);
    expect(payment.payer.value).toEqual(paymentCreatorDto.payer);
    expect(payment.beneficiary.value).toEqual(paymentCreatorDto.beneficiary);
    expect(payment.amount.value).toEqual(paymentCreatorDto.amount);
    expect(payment.description.value).toEqual(paymentCreatorDto.description);

    const today = new DomainDate(new Date());
    expect(payment.date.toYYMMDD()).toEqual(today.toYYMMDD());
  });

  it("should throw an error if the group is invalid", async () => {
    const paymentCreatorDto = PaymentMother.creatorDto({
      group: invalidGroupUuid,
    });

    const paymentCreator = container.resolve<PaymentCreator>(PaymentCreator);

    await expect(paymentCreator.create(paymentCreatorDto)).rejects.toThrowError(
      NotFoundGroupException
    );
  });

  it("should throw an error if the payer is invalid", async () => {
    const paymentCreatorDto = PaymentMother.creatorDto({
      payer: invalidPayerUuid,
    });

    const paymentCreator = container.resolve<PaymentCreator>(PaymentCreator);

    await expect(paymentCreator.create(paymentCreatorDto)).rejects.toThrowError(
      NotFoundUserException
    );
  });

  it("should throw an error if the beneficiary is invalid", async () => {
    const paymentCreatorDto = PaymentMother.creatorDto({
      beneficiary: invalidBeneficiaryUuid,
    });

    const paymentCreator = container.resolve<PaymentCreator>(PaymentCreator);

    await expect(paymentCreator.create(paymentCreatorDto)).rejects.toThrowError(
      NotFoundUserException
    );
  });

  it("should throw an error if the amount is 0", async () => {
    const paymentCreatorDto = PaymentMother.creatorDto({
      amount: 0,
    });

    const paymentCreator = container.resolve<PaymentCreator>(PaymentCreator);

    await expect(paymentCreator.create(paymentCreatorDto)).rejects.toThrowError(
      InvalidAmountException
    );
  });

  it("should throw an error if the amount is negative", async () => {
    const paymentCreatorDto = PaymentMother.creatorDto({
      amount: -1,
    });

    const paymentCreator = container.resolve<PaymentCreator>(PaymentCreator);

    await expect(paymentCreator.create(paymentCreatorDto)).rejects.toThrowError(
      InvalidAmountException
    );
  });
});

const depsRegister = () => {
  const paymentCreatorMocked = (payment: Payment) => {
    const isInvalidGroup = payment.group.value === invalidGroupUuid;
    const isInvalidPayer = payment.payer.value === invalidPayerUuid;
    const isInvalidBeneficiary =
      payment.beneficiary.value === invalidBeneficiaryUuid;

    if (isInvalidGroup) throw new NotFoundGroupException();
    if (isInvalidPayer || isInvalidBeneficiary)
      throw new NotFoundUserException();

    return Promise.resolve();
  };

  const mockerPaymentRepository = new Mock<PaymentRepository>()
    .setup((instance) => instance.create(It.IsAny<Payment>() as Payment))
    .callback((i: Expression) => {
      const payment = i.args[0] as Payment;

      return paymentCreatorMocked(payment);
    });

  container.register("PaymentRepository", {
    useValue: mockerPaymentRepository.object(),
  });

  unitDepsRegister();
};
