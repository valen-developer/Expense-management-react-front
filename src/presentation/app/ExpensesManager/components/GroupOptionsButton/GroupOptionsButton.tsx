import { AddExpenseForm } from "../AddExpenseForm/AddExpenseForm";
import { AddFriendToGroup } from "../AddFriendToGroup/AddFriendToGroup";
import { AddPaymentForm } from "../AddPaymentForm/AddPaymentForm";
import { Balance } from "../Balance/Balance";
import { GroupOptionItem } from "../GroupOptionItem/GroupOptionItem";

export const GroupOptionsButton = () => {
  return (
    <div>
      <GroupOptionItem title="Add payment">
        <AddPaymentForm />
      </GroupOptionItem>
      <GroupOptionItem title="Add expense">
        <AddExpenseForm />
      </GroupOptionItem>
      <GroupOptionItem title="Add member">
        <AddFriendToGroup />
      </GroupOptionItem>
      <GroupOptionItem title="See balance">
        <Balance />
      </GroupOptionItem>
    </div>
  );
};
