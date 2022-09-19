import { PaymentCard, PaymentCardProps } from "../PaymentCard/PaymentCard";

import styles from "./PaymentCollection.module.scss";

interface PaymentCollectionProps {
  payments: PaymentCardProps[];
}

export const PaymentCollection: React.FC<PaymentCollectionProps> = ({
  payments,
}) => {
  return (
    <div className={styles.collection}>
      {payments.map((payment) => (
        <PaymentCard {...payment} />
      ))}
    </div>
  );
};
