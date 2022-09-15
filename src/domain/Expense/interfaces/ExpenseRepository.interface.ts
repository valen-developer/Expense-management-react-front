import { Expense } from "../Expense.model";

export abstract class ExpenseRepository {
  abstract create(expense: Expense): Promise<void>;
}
