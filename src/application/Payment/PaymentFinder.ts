import { inject, injectable } from "tsyringe";
import { PaymentQuery } from "../../domain/Payment/dtos/PaymentQuery.dto";
import { PaymentRepository } from "../../domain/Payment/interfaces/PaymentRepository.interface";
import { Payment } from "../../domain/Payment/Payment.model";

@injectable()
export class PaymentFinder {
  constructor(
    @inject("PaymentRepository") private paymentRepository: PaymentRepository
  ) {}

  public async filter(query: PaymentQuery): Promise<Payment[]> {
    const dtos = await this.paymentRepository.filter(query);

    return dtos.map((dto) => new Payment(dto));
  }

  public async findByGroup(groupUuid: string): Promise<Payment[]> {
    return this.filter({ group_equals: groupUuid });
  }
}
