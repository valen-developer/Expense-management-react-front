import { PaymentDto } from "../../domain/Payment/dtos/Payment.dto";
import { PaymentQuery } from "../../domain/Payment/dtos/PaymentQuery.dto";
import { PaymentRepository } from "../../domain/Payment/interfaces/PaymentRepository.interface";
import { Payment } from "../../domain/Payment/Payment.model";

export class InMemoryPaymentRepository implements PaymentRepository {
  private payments: PaymentDto[] = [];

  create(payment: Payment): Promise<void> {
    this.payments.push(payment.toDto());
    return Promise.resolve();
  }
  filter(query: PaymentQuery): Promise<PaymentDto[]> {
    return Promise.resolve(this.applyFilter(query));
  }

  private applyFilter(query: PaymentQuery): PaymentDto[] {
    return this.payments.filter((payment) => {
      return query.group_equals === payment.group;
    });
  }
}
