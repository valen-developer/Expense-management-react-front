import { ExpenseDto } from "../../domain/Expense/dtos/Expense.dto";
import { ExpensesQuery } from "../../domain/Expense/dtos/ExpensesQuery.dto";
import { Expense } from "../../domain/Expense/Expense.model";
import { ExpenseRepository } from "../../domain/Expense/interfaces/ExpenseRepository.interface";

export class InMemoryExpenseRepository implements ExpenseRepository {
  private expenses: ExpenseDto[] = [];

  public create(expense: Expense): Promise<void> {
    this.expenses.push(expense.toDto());
    return Promise.resolve();
  }

  public filter(query: ExpensesQuery): Promise<ExpenseDto[]> {
    return new Promise((resolve) => {
      resolve(this.getByFilter(query));
    });
  }

  private getByFilter(query: ExpensesQuery): ExpenseDto[] {
    return this.expenses.filter((expense) => {
      const { friend_equals, group_equals } = query;

      const isInFriend = friend_equals
        ? expense.friend === friend_equals
        : true;
      const isInGroup = group_equals ? expense.group === group_equals : true;

      return isInFriend && isInGroup;
    });
  }
}
