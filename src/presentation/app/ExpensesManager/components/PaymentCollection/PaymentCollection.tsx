import { PaymentCard, PaymentCardProps } from "../PaymentCard/PaymentCard";

import styles from "./PaymentCollection.module.scss";

interface PaymentCollectionProps {
  payments: PaymentCardProps[];
}

export const PaymentCollection = (props: PaymentCollectionProps) => {
  return (
    <div className={styles.collection}>
      {props.payments.map((payment) => (
        <PaymentCard {...payment} />
      ))}
    </div>
  );
};
