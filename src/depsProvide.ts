import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";
import { InMemoryBalanceRepository } from "./infrastructure/Balance/InMemoryBalanceRepository";
import { InMemoryExpenseRepository } from "./infrastructure/Expense/InMemoryExpenseRepository";
import { InMemoryFriendRepository } from "./infrastructure/Friend/InMemoryFriendRepository";
import { InMemoryGroupRepository } from "./infrastructure/Group/InMemoryGroupRepository";
import { InMemoryPaymentRepository } from "./infrastructure/Payment/InMemoryPaymentRepository";
import { InMemoryUserRepository } from "./infrastructure/User/InMemoryUserRepository";
import { UuidUUIDGenerator } from "./infrastructure/vendor/UuidUUIDGenerator";

export const appDepsProvide = () => {
  container.register("UUIDGenerator", {
    useClass: UuidUUIDGenerator,
  });

  injectRepository("UserRepository", InMemoryUserRepository);
  injectRepository("GroupRepository", InMemoryGroupRepository);

  injectRepository("FriendRepository", InMemoryFriendRepository);
  injectRepository("ExpenseRepository", InMemoryExpenseRepository);
  injectRepository("PaymentRepository", InMemoryPaymentRepository);

  injectRepository("BalanceRepository", InMemoryBalanceRepository);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const injectRepository = (repository: string, useClass: any) => {
  container.register(
    repository,
    {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass,
    },
    {
      lifecycle: Lifecycle.Singleton,
    }
  );
};
