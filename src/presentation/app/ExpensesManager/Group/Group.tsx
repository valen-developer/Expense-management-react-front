import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Expense } from "../../../../domain/Expense/Expense.model";
import { Friend } from "../../../../domain/Friend/Friend.model";
import { Group as GroupDomain } from "../../../../domain/Group/Group.model";
import { Payment } from "../../../../domain/Payment/Payment.model";
import { Nullable } from "../../../../domain/Shared/types/Nullable.type";
import { GroupOptionsButton } from "../components/GroupOptionsButton/GroupOptionsButton";
import { PaymentCollection } from "../components/PaymentCollection/PaymentCollection";
import { useBuildTransactions } from "../hooks/useBuildTransactions";
import { useFetchExpenses } from "../hooks/useFetchExpenses";
import { useFetchFriendsByGroup } from "../hooks/useFetchFriendsByGroup";
import { useFetchGroups } from "../hooks/useFetchGroups";
import { useFetchPayments } from "../hooks/useFetchPayments";
import { GroupContext } from "./GroupContext";

export const Group = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [group, setGroup] = useState<Nullable<GroupDomain>>(null);

  const [localFriends, setLocalFriends] = useState<Friend[]>([]);
  const { friends, handleFetchFriendsByGroup } = useFetchFriendsByGroup();

  const { transactions, handleBuildTransactions } = useBuildTransactions();

  const { groups, handleFetchGroups } = useFetchGroups();
  const { expenses, handleFetchExpenses, handleAddExpense } =
    useFetchExpenses();
  const { payments, handleFetchPayments, handleAddPayment } =
    useFetchPayments();

  useEffect(() => {
    handleFetchGroups({ uuid_equals: uuid });

    handleFetchExpenses({
      group_equals: uuid,
    });

    handleFetchPayments({
      group_equals: uuid,
    });
  }, [uuid]);

  useEffect(() => {
    if (groups?.length <= 0) return;
    setGroup(groups[0]);
  }, [groups]);

  useEffect(() => {
    if (!group) return;
    handleFetchFriendsByGroup(group);
  }, [group]);

  useEffect(() => {
    setLocalFriends(friends);
  }, [friends]);

  useEffect(() => {
    handleBuildTransactions([...expenses, ...payments]);
  }, [expenses, payments]);

  const addFriendToGroup = (friend: Friend) => {
    setLocalFriends([...localFriends, friend]);
  };

  const addPaymentToGroup = (payment: Payment) => {
    handleAddPayment(payment);
  };

  const addExpenseToGroup = (expense: Expense) => {
    handleAddExpense(expense);
  };

  return (
    <GroupContext.Provider
      value={{
        group,
        groupFriends: localFriends,
        expenses,
        payments,
        addFriendToGroup,
        addExpenseToGroup,
        addPaymentToGroup,
      }}
    >
      <GroupOptionsButton />
      <PaymentCollection payments={transactions} />
    </GroupContext.Provider>
  );
};
