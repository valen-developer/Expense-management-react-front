import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

import styles from "./Group.module.scss";

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
      <div className={styles.group_wrapper}>
        <div className={styles.header}>
          <div className={styles.header__title}>
            <Link className="link" to="..">
              <i className="fas fa-arrow-left"></i>
            </Link>

            <h1>{group?.name.value}</h1>
            <GroupOptionsButton />
          </div>

          <div className={styles.header__imageContainer}>
            <img
              src="/src/presentation/assets/images/group.png"
              alt="group image"
            />
          </div>

          <div className={styles.header__general_information}>
            <div className={styles.header__operationContainer}>
              <i className="fas fa-exchange-alt"></i>
              <span>{transactions.length} Transactions</span>
            </div>

            <div className={styles.header__operationContainer}>
              <i className="fas fa-user-friends"></i>
              <span>{friends.length} Friends</span>
            </div>
          </div>
        </div>

        <div className={styles.collection_container}>
          <PaymentCollection payments={transactions} />
        </div>
      </div>
    </GroupContext.Provider>
  );
};
