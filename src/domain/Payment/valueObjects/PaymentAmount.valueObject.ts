import { InvalidAmountException } from "../../Expense/exceptions/InvalidAmount.exception";
import { NotNullValueObject } from "../../Shared/valueObjects/NotNull.valueObject";

export class PaymentAmount extends NotNullValueObject<number> {
  constructor(value: number) {
    super(value, "Payment amount");

    this.checkValue(value);
  }

  private checkValue(value: number) {
    const isLessOrEqualThanZero = value <= 0;

    if (isLessOrEqualThanZero) throw new InvalidAmountException();
  }
}
