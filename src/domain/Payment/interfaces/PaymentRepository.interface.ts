import { PaymentDto } from "../dtos/Payment.dto";
import { PaymentQuery } from "../dtos/PaymentQuery.dto";
import { Payment } from "../Payment.model";

export abstract class PaymentRepository {
  abstract create(payment: Payment): Promise<void>;
  abstract filter(query: PaymentQuery): Promise<PaymentDto[]>;
}
