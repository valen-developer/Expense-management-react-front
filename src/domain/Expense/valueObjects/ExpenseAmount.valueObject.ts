import { NotNullValueObject } from "../../Shared/valueObjects/NotNull.valueObject";
import { InvalidAmountException } from "../exceptions/InvalidAmount.exception";

export class ExpenseAmount extends NotNullValueObject<number> {
  private readonly GREATER_THAN = 0;

  constructor(value: number) {
    super(value, "Expense Amount");

    this.checkValue(value);
  }

  private checkValue(value: number): void {
    if (value <= this.GREATER_THAN) {
      throw new InvalidAmountException();
    }
  }
}
