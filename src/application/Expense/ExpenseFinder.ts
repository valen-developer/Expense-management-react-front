import { inject, injectable } from "tsyringe";
import { ExpensesQuery } from "../../domain/Expense/dtos/ExpensesQuery.dto";
import { Expense } from "../../domain/Expense/Expense.model";
import { ExpenseRepository } from "../../domain/Expense/interfaces/ExpenseRepository.interface";

@injectable()
export class ExpenseFinder {
  constructor(
    @inject("ExpenseRepository") private expenseRepository: ExpenseRepository
  ) {}

  public async filter(query: ExpensesQuery): Promise<Expense[]> {
    const dtos = await this.expenseRepository.filter(query);

    return dtos.map((dto) => new Expense(dto));
  }

  public async findByFriend(friend: string): Promise<Expense[]> {
    return this.filter({ friend_equals: friend });
  }

  public async findByGroup(group: string): Promise<Expense[]> {
    return this.filter({ group_equals: group });
  }
}
