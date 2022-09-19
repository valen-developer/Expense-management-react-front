import { Friend } from "../Friend/Friend.model";
import { BalanceDto } from "./dtos/Balance.dto";
import { Transaction } from "./dtos/Transaction.dto";
import { FriendBalanceList } from "./valueObjects/FriendBalanceList.valueObjec";

export class Balance {
  public readonly friendsBalance: FriendBalanceList;

  constructor(params: BalanceDto) {
    this.friendsBalance = new FriendBalanceList(params.friendsBalance);
  }

  public suggestTransactionsToPutZeroBalance(): Transaction[] {
    const data = this.friendsBalance.toArray().map((f) => {
      return {
        friend: f.friend,
        balance: f.balance,
      };
    });

    const transactions = this.getTransactions(data);

    return transactions;
  }

  private getTransactions(
    data: { friend: Friend; balance: number }[]
  ): Transaction[] {
    const positiveBalances = data.filter(({ balance }) => balance > 0);
    const negativeBalances = data.filter(({ balance }) => balance < 0);

    let operations: Transaction[] = [];

    positiveBalances.forEach((positive) => {
      negativeBalances.forEach((negative) => {
        const amount = Math.min(positive.balance, Math.abs(negative.balance));
        if (amount === 0) return;

        const transaction = {
          payer: positive.friend,
          receiver: negative.friend,
          amount: amount,
        };

        operations = [...operations, transaction];

        positive.balance -= amount;
        negative.balance += amount;
      });
    });

    return operations;
  }
}
