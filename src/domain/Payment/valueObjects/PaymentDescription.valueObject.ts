import { NotNullValueObject } from "../../Shared/valueObjects/NotNull.valueObject";

export class PaymentDescription extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "Payment description");
  }
}
