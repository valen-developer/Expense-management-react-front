import { unitDepsRegister } from "../../helpers/unitDepsRegister";
import { container } from "tsyringe";

import { ExpenseFinder } from "../../../../src/application/Expense/ExpenseFinder";
import { Expense } from "../../../../src/domain/Expense/Expense.model";
import { Expression, It, Mock } from "moq.ts";
import { ExpenseRepository } from "../../../../src/domain/Expense/interfaces/ExpenseRepository.interface";
import { ExpenseMother } from "../../helpers/Expense/ExpenseMother";
import { ExpensesQuery } from "../../../../src/domain/Expense/dtos/ExpensesQuery.dto";
import { ExpenseDto } from "../../../../src/domain/Expense/dtos/Expense.dto";

const groupWithExpensesUuid = "groupWithExpensesUuid";
const groupWithoutExpensesUuid = "groupWithoutExpensesUuid";

const friendWithExpensesUuid = "friendWithExpensesUuid";
const friendWithoutExpensesUuid = "friendWithoutExpensesUuid";

describe("Expense Finder", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should found an array of expenses given a group uuid", async () => {
    const expensesFinder = container.resolve<ExpenseFinder>(ExpenseFinder);

    const expenses = await expensesFinder.findByGroup(groupWithExpensesUuid);

    expect(expenses).toBeInstanceOf(Array);

    expect(expenses.length).toBeGreaterThan(0);

    expenses.forEach((expense) => {
      expect(expense).toBeInstanceOf(Expense);
      expect(expense.group.value).toBe(groupWithExpensesUuid);
    });
  });

  it("should found an empty array of expenses given a group without expenses", async () => {
    const expensesFinder = container.resolve<ExpenseFinder>(ExpenseFinder);

    const expenses = await expensesFinder.findByGroup(groupWithoutExpensesUuid);

    expect(expenses).toBeInstanceOf(Array);
    expect(expenses.length).toBe(0);
  });

  it("should found an array of expenses given a friend uuid", async () => {
    const expensesFinder = container.resolve<ExpenseFinder>(ExpenseFinder);

    const expenses = await expensesFinder.findByFriend(friendWithExpensesUuid);

    expect(expenses).toBeInstanceOf(Array);

    expect(expenses.length).toBeGreaterThan(0);

    expenses.forEach((expense) => {
      expect(expense).toBeInstanceOf(Expense);
      expect(expense.friend.value).toBe(friendWithExpensesUuid);
    });
  });

  it("should found an empty array of expenses given a friend uuid without expenses", async () => {
    const expensesFinder = container.resolve<ExpenseFinder>(ExpenseFinder);

    const expenses = await expensesFinder.findByFriend(
      friendWithoutExpensesUuid
    );

    expect(expenses).toBeInstanceOf(Array);
    expect(expenses.length).toBe(0);
  });
});

const depsRegister = () => {
  const filterMocked = (query?: ExpensesQuery): Promise<ExpenseDto[]> => {
    const friendUUid = query?.friend_equals;
    const hasNotByFriend = friendUUid === friendWithoutExpensesUuid;
    if (hasNotByFriend) return Promise.resolve([]);
    if (friendUUid)
      return Promise.resolve(
        ExpenseMother.array(3, { friend: friendUUid }).map((e) => e.toDto())
      );

    const groupUUid = query?.group_equals;
    const hasNotByGroup = groupUUid === groupWithoutExpensesUuid;
    if (hasNotByGroup) return Promise.resolve([]);
    if (groupUUid)
      return Promise.resolve(
        ExpenseMother.array(3, { group: groupUUid }).map((e) => e.toDto())
      );

    return Promise.resolve(
      ExpenseMother.array(3, {
        ...(friendUUid && { friend: friendUUid }),
        ...(groupUUid && { group: groupUUid }),
      }).map((expense) => expense.toDto())
    );
  };

  const mockerExpenseRepository = new Mock<ExpenseRepository>()
    .setup((instance) =>
      instance.filter(It.IsAny<ExpensesQuery>() as ExpensesQuery)
    )
    .callback((i: Expression) => {
      const query = i.args[0] as ExpensesQuery;
      return filterMocked(query);
    });

  container.register("ExpenseRepository", {
    useValue: mockerExpenseRepository.object(),
  });

  unitDepsRegister();
};
