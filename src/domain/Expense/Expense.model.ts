import { Dated } from "../Shared/Dated.model";
import { WithOptionals } from "../Shared/types/WithOptionals.type";
import { UUID } from "../Shared/valueObjects/UUID.valueObject";
import { ExpenseDto } from "./dtos/Expense.dto";
import { ExpenseAmount } from "./valueObjects/ExpenseAmount.valueObject";
import { ExpenseDescription } from "./valueObjects/ExpenseDescription.valueObject";

export class Expense extends Dated {
  public readonly uuid: UUID;
  public readonly friend: UUID;
  public readonly group: UUID;
  public readonly amount: ExpenseAmount;
  public readonly description: ExpenseDescription;

  constructor(params: WithOptionals<ExpenseDto, "createdAt" | "updatedAt">) {
    const { createdAt, updatedAt } = params;
    super({ createdAt, updatedAt });

    this.uuid = new UUID(params.uuid);
    this.friend = new UUID(params.friend);
    this.group = new UUID(params.group);
    this.amount = new ExpenseAmount(params.amount);
    this.description = new ExpenseDescription(params.description);
  }

  public toDto(): ExpenseDto {
    return {
      uuid: this.uuid.value,
      friend: this.friend.value,
      group: this.group.value,
      amount: this.amount.value,
      description: this.description.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
