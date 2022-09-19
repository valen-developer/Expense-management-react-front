import { inject, singleton } from "tsyringe";
import { Balance } from "../../domain/Balance/Balance.model";
import { FriendBalance } from "../../domain/Balance/FriendBalance.model";
import { BalanceRepository } from "../../domain/Balance/interfaces/BalanceRepository.interface";
import { ExpenseDto } from "../../domain/Expense/dtos/Expense.dto";
import { ExpenseRepository } from "../../domain/Expense/interfaces/ExpenseRepository.interface";
import { Friend } from "../../domain/Friend/Friend.model";
import { FriendRepository } from "../../domain/Friend/interfaces/FriendRepository.interface";
import { GroupRepository } from "../../domain/Group/interfaces/GroupRepository.interface";
import { PaymentDto } from "../../domain/Payment/dtos/Payment.dto";
import { PaymentRepository } from "../../domain/Payment/interfaces/PaymentRepository.interface";
import { asyncMap } from "../../helpers/asyncMap";

@singleton()
export class InMemoryBalanceRepository implements BalanceRepository {
  constructor(
    @inject("GroupRepository") private groupRepository: GroupRepository,
    @inject("ExpenseRepository") private expenseRepository: ExpenseRepository,
    @inject("PaymentRepository") private paymentRepository: PaymentRepository,
    @inject("FriendRepository") private friendRepository: FriendRepository
  ) {}

  public async getBalance(groupUUid: string): Promise<Balance> {
    const group = await this.groupRepository
      .filter({ uuid_equals: groupUUid })
      .then((array) => array[0]);
    const friends = group.friends;
    const expenses = await this.expenseRepository.filter({
      group_equals: groupUUid,
    });
    const payments = await this.paymentRepository.filter({
      group_equals: groupUUid,
    });

    const totalExpense = expenses.reduce((acc, expense) => {
      return acc + expense.amount;
    }, 0);

    const payForEachFriend = totalExpense / friends.length;

    const friendBalances = await asyncMap(friends, async (f) => {
      const { expense, payed, received } = this.getTransactions(
        expenses,
        payments,
        f
      );

      const balance = payForEachFriend + (received - payed - expense);

      const friend = await this.friendRepository
        .filter({ uuid_equals: f })
        .then((array) => array[0]);

      const friendBalanceDto = new FriendBalance({
        balance,
        totalExpense: expense,
        totalPayed: payed,
        totalReceived: received,
        friend: new Friend(friend),
      });

      return friendBalanceDto;
    });

    return new Balance({
      friendsBalance: friendBalances,
    });
  }

  private getTransactions(
    expenses: ExpenseDto[],
    payments: PaymentDto[],
    friend: string
  ): Transactions {
    let expense = 0;
    let payed = 0;
    let received = 0;

    expenses.forEach((e) => {
      if (e.friend === friend) {
        expense += e.amount;
      }
    });

    payments.forEach((p) => {
      if (p.payer === friend) {
        payed += p.amount;
      }

      if (p.beneficiary === friend) {
        received += p.amount;
      }
    });

    return {
      expense,
      payed,
      received,
    };
  }
}

interface Transactions {
  expense: number;
  payed: number;
  received: number;
}
