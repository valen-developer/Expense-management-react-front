import { container } from "tsyringe";
import { ExpenseCreator } from "../../../../application/Expense/ExpenseCreator";
import { ExpenseCreatorDto } from "../../../../domain/Expense/dtos/ExpenseCreatorDto.dto";

export const useExpenseCreation = () => {
  const expenseCreator = container.resolve(ExpenseCreator);

  const handleExpenseCreation = (expenseCreatorDto: ExpenseCreatorDto) => {
    return expenseCreator.create(expenseCreatorDto);
  };

  return {
    handleExpenseCreation,
  };
};
