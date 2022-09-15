import { unitDepsRegister } from "../../helpers/unitDepsRegister";
import { container } from "tsyringe";

import { It, Mock } from "moq.ts";
import { ExpenseCreator } from "../../../../src/application/Expense/ExpenseCreator";
import { InvalidAmountException } from "../../../../src/domain/Expense/exceptions/InvalidAmount.exception";
import { Expense } from "../../../../src/domain/Expense/Expense.model";
import { ExpenseRepository } from "../../../../src/domain/Expense/interfaces/ExpenseRepository.interface";
import { NullException } from "../../../../src/domain/Shared/exceptions/Null.exception";
import { DomainDate } from "../../../../src/domain/Shared/valueObjects/DomainDate.valueObject";
import { ExpenseMother } from "../../helpers/Expense/ExpenseMother";

describe("Expense Creator", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should create an expense", async () => {
    const expenseCreatorDto = ExpenseMother.creatorDto();

    const expenseCreator = container.resolve<ExpenseCreator>(ExpenseCreator);

    const expense = await expenseCreator.create(expenseCreatorDto);

    expect(expense).toBeInstanceOf(Expense);

    expect(expense.friend.value).toEqual(expenseCreatorDto.friend);
    expect(expense.amount.value).toEqual(expenseCreatorDto.amount);
    expect(expense.description.value).toEqual(expenseCreatorDto.description);

    const today = new DomainDate(new Date());
    expect(expense.createdAt.toYYMMDD()).toEqual(today.toYYMMDD());
  });

  it("should throw exception if has not friend", async () => {
    const expenseCreatorDto = ExpenseMother.creatorDto({
      friend: undefined as unknown as string,
    });

    const expenseCreator = container.resolve<ExpenseCreator>(ExpenseCreator);

    await expect(expenseCreator.create(expenseCreatorDto)).rejects.toThrow(
      NullException
    );
  });

  it("should throw exception if amount is  equal to 0", async () => {
    const expenseCreatorDto = ExpenseMother.creatorDto({
      amount: 0,
    });

    const expenseCreator = container.resolve<ExpenseCreator>(ExpenseCreator);

    await expect(expenseCreator.create(expenseCreatorDto)).rejects.toThrow(
      InvalidAmountException
    );
  });

  it("should throw exception if amount is less than 0", async () => {
    const expenseCreatorDto = ExpenseMother.creatorDto({
      amount: -1,
    });

    const expenseCreator = container.resolve<ExpenseCreator>(ExpenseCreator);

    await expect(expenseCreator.create(expenseCreatorDto)).rejects.toThrow(
      InvalidAmountException
    );
  });

  it("should throw exception if has not description", async () => {
    const expenseCreatorDto = ExpenseMother.creatorDto({
      description: undefined as unknown as string,
    });

    const expenseCreator = container.resolve<ExpenseCreator>(ExpenseCreator);

    await expect(expenseCreator.create(expenseCreatorDto)).rejects.toThrow(
      NullException
    );
  });
});

const depsRegister = () => {
  const mockerExpenseRepository = new Mock<ExpenseRepository>()
    .setup((instance) => instance.create(It.IsAny<Expense>() as Expense))
    .returns(Promise.resolve());

  container.register("ExpenseRepository", {
    useValue: mockerExpenseRepository.object(),
  });

  unitDepsRegister();
};
