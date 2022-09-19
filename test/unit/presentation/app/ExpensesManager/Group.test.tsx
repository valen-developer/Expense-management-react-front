import "@testing-library/jest-dom";
import "reflect-metadata";

import { act } from "react-dom/test-utils";
import { Group } from "../../../../../src/domain/Group/Group.model";
import { Group as GroupPage } from "../../../../../src/presentation/app/ExpensesManager/Group/Group";

import { fireEvent, screen } from "@testing-library/react";
import { It, Mock } from "moq.ts";
import { container } from "tsyringe";
import { BalanceRepository } from "../../../../../src/domain/Balance/interfaces/BalanceRepository.interface";
import { ExpensesQuery } from "../../../../../src/domain/Expense/dtos/ExpensesQuery.dto";
import { ExpenseRepository } from "../../../../../src/domain/Expense/interfaces/ExpenseRepository.interface";
import { FriendQuery } from "../../../../../src/domain/Friend/dtos/FriendQuery.dto";
import { FriendRepository } from "../../../../../src/domain/Friend/interfaces/FriendRepository.interface";
import { GroupQuery } from "../../../../../src/domain/Group/dtos/GroupQuery.dto";
import { GroupRepository } from "../../../../../src/domain/Group/interfaces/GroupRepository.interface";
import { PaymentQuery } from "../../../../../src/domain/Payment/dtos/PaymentQuery.dto";
import { PaymentRepository } from "../../../../../src/domain/Payment/interfaces/PaymentRepository.interface";
import { BalanceMother } from "../../../../helpers/Balance/BalanceMother";
import { FriendMother } from "../../../../helpers/Friend/FriendMother";
import { GroupMother } from "../../../../helpers/Group/GroupMother";
import { RendererHelper } from "../../../../helpers/presentation/RendererHelper";
import { UserMother } from "../../../../helpers/User/UserMother";
import { unitDepsRegister } from "../../../helpers/unitDepsRegister";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    uuid: "groupUuid",
  }),
}));

const user = UserMother.random();
const mockedFriends = FriendMother.array(3, { user: user.uuid.value });
const mockedInitialGroups = GroupMother.array(1, {
  uuid: "groupUuid",
  user: user.uuid.value,
  friends: mockedFriends.map((f) => f.uuid.value),
});
const mockerFriendBalanceList = BalanceMother.randomFriendsBalanceList(3);
mockerFriendBalanceList.push(
  BalanceMother.randomFriendsBalance({ balance: -300 })
);
const mockedBalance = BalanceMother.ramdon(undefined, mockerFriendBalanceList);

describe("Group", () => {
  let initialGroups: Group[] = mockedInitialGroups;

  beforeAll(() => {
    depsRegister();
  });

  beforeEach(() => {
    initialGroups = mockedInitialGroups;
  });

  // it("should can add a new friend to group", () => {});

  // it("should can make new expense", () => {});

  // it("should can make new payment", async () => {
  //   await act(async () => {
  //     RendererHelper.Wrapper(GroupPage, {
  //       auth: {
  //         user: user,
  //         isAuthenticated: true,
  //       },
  //       group: {
  //         groups: [...initialGroups],
  //       },
  //     });

  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });

  //   const payment = PaymentMother.random();

  //   const addPaymentButton = screen.getByText(/add payment/i);

  //   await act(async () => {
  //     fireEvent.click(addPaymentButton);
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });

  //   const amountInput = screen.getByTestId(/amount/i);
  //   const descriptionInput = screen.getByTestId(/description/i);
  //   const dateInput = screen.getByTestId(/date/i);
  //   const payerInput = screen.getByTestId(/payer/i);
  //   const beneficiaryInput = screen.getByTestId(/beneficiary/i);

  //   const submitButton = screen.getByTestId(/payment-submit/i);

  //   fireEvent.change(amountInput, { target: { value: payment.amount.value } });
  //   fireEvent.change(descriptionInput, {
  //     target: { value: payment.description.value },
  //   });
  //   fireEvent.change(dateInput, { target: { value: payment.date.toYYMMDD() } });

  //   fireEvent.change(payerInput, {
  //     target: { value: mockedFriends[0].uuid.value },
  //   });
  //   fireEvent.change(beneficiaryInput, {
  //     target: { value: mockedFriends[2].uuid.value },
  //   });

  //   await act(async () => {
  //     fireEvent.click(submitButton);
  //     await new Promise((resolve) => setTimeout(resolve, 0));
  //   });

  //   expect(screen.getByText(payment.description.value)).toBeInTheDocument();
  //   expect(screen.getByText(payment.amount.value)).toBeInTheDocument();
  //   expect(screen.getByText(payment.date.toYYMMDD())).toBeInTheDocument();

  // });

  it("should can see a balance", async () => {
    await act(async () => {
      RendererHelper.Wrapper(GroupPage, {
        auth: {
          user: user,
          isAuthenticated: true,
        },
        group: {
          groups: [...initialGroups],
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const openOptionsButton = screen.getByTestId(/open-options/i);

    await act(async () => {
      fireEvent.click(openOptionsButton);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const seeBalanceButton = screen.getByText(/see balance/i);

    await act(async () => {
      fireEvent.click(seeBalanceButton);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    mockedBalance.friendsBalance.toArray().forEach((fb) => {
      expect(screen.getByText(fb.friend.name.value)).toBeInTheDocument();
      expect(screen.getByText(fb.balance.toString())).toBeInTheDocument();
    });
  });

  it("should can see a suggestion", async () => {
    await act(async () => {
      RendererHelper.Wrapper(GroupPage, {
        auth: {
          user: user,
          isAuthenticated: true,
        },
        group: {
          groups: [...initialGroups],
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const openOptionsButton = screen.getByTestId(/open-options/i);

    await act(async () => {
      fireEvent.click(openOptionsButton);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const seeBalanceButton = screen.getByText(/see balance/i);

    await act(async () => {
      fireEvent.click(seeBalanceButton);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const suggestion = mockedBalance.suggestTransactionsToPutZeroBalance();

    suggestion.forEach((s) => {
      expect(screen.getByText(s.payer.name.value)).toBeInTheDocument();
      expect(screen.getByText(s.receiver.name.value)).toBeInTheDocument();
      expect(screen.getByText(s.amount.toString())).toBeInTheDocument();
    });
  });
});

const depsRegister = () => {
  const mockedFriendRepository = new Mock<FriendRepository>()
    .setup((instance) => instance.filter(It.IsAny() as FriendQuery))
    .returns(Promise.resolve(mockedFriends.map((f) => f.toDto())));

  const mockedGroupRepository = new Mock<GroupRepository>()
    .setup((instance) => instance.filter(It.IsAny() as GroupQuery))
    .returns(Promise.resolve(mockedInitialGroups.map((g) => g.toDto())));

  const mockerExpenseRepository = new Mock<ExpenseRepository>()
    .setup((instance) => instance.filter(It.IsAny() as ExpensesQuery))
    .returns(Promise.resolve([]));

  const mockerPaymentRepository = new Mock<PaymentRepository>()
    .setup((instance) => instance.filter(It.IsAny() as PaymentQuery))
    .returns(Promise.resolve([]));

  const mockerBalanceRepository = new Mock<BalanceRepository>()
    .setup((instance) => instance.getBalance(It.IsAny() as string))
    .callback(() => {
      return Promise.resolve(mockedBalance);
    });

  container.register("FriendRepository", {
    useValue: mockedFriendRepository.object(),
  });

  container.register("GroupRepository", {
    useValue: mockedGroupRepository.object(),
  });

  container.register("ExpenseRepository", {
    useValue: mockerExpenseRepository.object(),
  });

  container.register("PaymentRepository", {
    useValue: mockerPaymentRepository.object(),
  });

  container.register("BalanceRepository", {
    useValue: mockerBalanceRepository.object(),
  });

  unitDepsRegister();
};
