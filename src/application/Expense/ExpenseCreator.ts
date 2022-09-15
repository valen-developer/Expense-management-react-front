import { inject, injectable } from "tsyringe";
import { ExpenseCreatorDto } from "../../domain/Expense/dtos/ExpenseCreatorDto.dto";
import { Expense } from "../../domain/Expense/Expense.model";
import { ExpenseRepository } from "../../domain/Expense/interfaces/ExpenseRepository.interface";
import { UUIDGenerator } from "../../domain/Shared/interfaces/UUIDGenerator.interface";

@injectable()
export class ExpenseCreator {
  constructor(
    @inject("ExpenseRepository") private expenseRepository: ExpenseRepository,
    @inject("UUIDGenerator") private uuidGenerator: UUIDGenerator
  ) {}

  async create(params: ExpenseCreatorDto): Promise<Expense> {
    const expense = new Expense({
      uuid: this.uuidGenerator.generate(),
      friend: params.friend,
      group: params.group,
      amount: params.amount,
      description: params.description,
    });

    await this.expenseRepository.create(expense);

    return expense;
  }
}
