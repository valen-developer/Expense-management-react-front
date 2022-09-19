import { flip, offset, shift, useFloating } from "@floating-ui/react-dom";
import { useRef, useState } from "react";
import { AddExpenseForm } from "../AddExpenseForm/AddExpenseForm";
import { AddFriendToGroup } from "../AddFriendToGroup/AddFriendToGroup";
import { AddPaymentForm } from "../AddPaymentForm/AddPaymentForm";
import { Balance } from "../Balance/Balance";
import { GroupOptionItem } from "../GroupOptionItem/GroupOptionItem";

import styles from "./GroupOptionsButton.module.scss";

export const GroupOptionsButton = () => {
  const { x, y, floating, reference } = useFloating({
    placement: "bottom",
    middleware: [flip(), offset(5), shift()],
  });

  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div className={styles.option__wrapper}>
      <button className="link" onClick={() => handleToggle()} ref={reference}>
        <i className="fas fa-ellipsis-v"></i>
      </button>

      {show && (
        <div
          className={styles.options__container}
          ref={floating}
          style={{
            position: "absolute",
            top: y ?? 0,
            left: x ?? 0,
          }}
        >
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
      )}
    </div>
  );
};
