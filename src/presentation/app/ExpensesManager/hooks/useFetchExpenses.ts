import { useState } from "react";
import { container } from "tsyringe";
import { ExpenseFinder } from "../../../../application/Expense/ExpenseFinder";
import { ExpensesQuery } from "../../../../domain/Expense/dtos/ExpensesQuery.dto";
import { Expense } from "../../../../domain/Expense/Expense.model";
import { Nullable } from "../../../../domain/Shared/types/Nullable.type";

export const useFetchExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<Nullable<string>>(null);

  const expensesFinder = container.resolve(ExpenseFinder);

  const handleFetchExpenses = (query: ExpensesQuery) => {
    expensesFinder
      .filter(query)
      .then((expenses) => {
        setExpenses(expenses);
      })
      .catch((error) => {
        if (error instanceof Error) {
          return setError(error.message);
        }

        setError("An unexpected error occurred");
      });
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses((expenses) => [...expenses, expense]);
  };

  return { expenses, error, handleFetchExpenses, handleAddExpense };
};
