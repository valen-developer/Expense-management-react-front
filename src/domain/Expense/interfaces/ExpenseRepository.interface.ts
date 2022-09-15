import { ExpenseDto } from "../dtos/Expense.dto";
import { ExpensesQuery } from "../dtos/ExpensesQuery.dto";
import { Expense } from "../Expense.model";

export abstract class ExpenseRepository {
  abstract create(expense: Expense): Promise<void>;
  abstract filter(expensesQuery: ExpensesQuery): Promise<ExpenseDto[]>;
}
