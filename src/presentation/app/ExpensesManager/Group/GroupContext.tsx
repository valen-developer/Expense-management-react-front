import { createContext } from "react";
import { Expense } from "../../../../domain/Expense/Expense.model";
import { Friend } from "../../../../domain/Friend/Friend.model";
import { Group } from "../../../../domain/Group/Group.model";
import { Payment } from "../../../../domain/Payment/Payment.model";
import { Nullable } from "../../../../domain/Shared/types/Nullable.type";

interface GroupContextProps {
  group: Nullable<Group>;
  groupFriends: Friend[];
  payments: Payment[];
  expenses: Expense[];

  addFriendToGroup: (friend: Friend) => void;
  addPaymentToGroup: (payment: Payment) => void;
  addExpenseToGroup: (expense: Expense) => void;
}

export const GroupContext = createContext<GroupContextProps>({
  group: null,
  groupFriends: [],
  payments: [],
  expenses: [],
  addFriendToGroup: () => {
    throw new Error("Not implemented");
  },
  addPaymentToGroup: () => {
    throw new Error("Not implemented");
  },
  addExpenseToGroup: () => {
    throw new Error("Not implemented");
  },
});
