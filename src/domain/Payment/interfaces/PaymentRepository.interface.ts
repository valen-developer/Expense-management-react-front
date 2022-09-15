import { Payment } from "../Payment.model";

export abstract class PaymentRepository {
  abstract create(payment: Payment): Promise<void>;
}
