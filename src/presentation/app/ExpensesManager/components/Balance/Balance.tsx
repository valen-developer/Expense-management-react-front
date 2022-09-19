import { useContext, useEffect, useState } from "react";
import { Balance as BalanceModel } from "../../../../../domain/Balance/Balance.model";
import { Transaction } from "../../../../../domain/Balance/dtos/Transaction.dto";
import { GroupContext } from "../../Group/GroupContext";
import { useFetchBalance } from "../../hooks/useFetchBalance";

export const Balance = () => {
  const { group } = useContext(GroupContext);
  const { handleFetchBalance } = useFetchBalance();

  const [balance, setBalance] = useState<BalanceModel>();
  const [sugessted, setSuggested] = useState<Transaction[]>();

  useEffect(() => {
    if (!group) return;
    handleFetchBalance(group.uuid.value)
      .then((response) => {
        setBalance(response);
        setSuggested(response.suggestTransactionsToPutZeroBalance());
      })
      .catch((error) => {
        console.log(error);
      });
  }, [group]);

  return (
    <div>
      <h2>Balance</h2>
      {balance && (
        <div>
          {balance.friendsBalance.toArray().map((friendBalance) => {
            return (
              <div key={friendBalance.friend.uuid.value}>
                <span>{friendBalance.friend.name.value}</span>
                <span>{friendBalance.balance}</span>
              </div>
            );
          })}
        </div>
      )}

      <h2>Suggestion</h2>
      {sugessted && (
        <div>
          {sugessted.map((transaction) => {
            return (
              <div key={transaction.amount}>
                <span>
                  {transaction.payer.name.value} {"->"}{" "}
                  {transaction.receiver.name.value}
                </span>
                <span>{transaction.amount}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
