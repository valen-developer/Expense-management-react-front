import { NotNullValueObject } from "../../Shared/valueObjects/NotNull.valueObject";

export class ExpenseDescription extends NotNullValueObject<string> {
  constructor(value: string) {
    super(value, "Expense Description");
  }
}
