import { inject, injectable } from "tsyringe";
import { PaymentCreatorDto } from "../../domain/Payment/dtos/PaymentCreator.dto";
import { PaymentRepository } from "../../domain/Payment/interfaces/PaymentRepository.interface";
import { Payment } from "../../domain/Payment/Payment.model";
import { UUIDGenerator } from "../../domain/Shared/interfaces/UUIDGenerator.interface";

@injectable()
export class PaymentCreator {
  constructor(
    @inject("PaymentRepository") private paymentRepository: PaymentRepository,
    @inject("UUIDGenerator") private paymentFactory: UUIDGenerator
  ) {}

  public async create(params: PaymentCreatorDto): Promise<Payment> {
    const payment = new Payment({
      uuid: this.paymentFactory.generate(),
      group: params.group,
      payer: params.payer,
      payerName: params.payerName,
      beneficiary: params.beneficiary,
      beneficiaryName: params.beneficiaryName,
      amount: params.amount,
      description: params.description,
      date: params.date,
    });

    await this.paymentRepository.create(payment);

    return payment;
  }
}
