import { PaymentCard, PaymentCardProps } from "../PaymentCard/PaymentCard";

interface PaymentCollectionProps {
  payments: PaymentCardProps[];
}

export const PaymentCollection = (props: PaymentCollectionProps) => {
  return (
    <div>
      {props.payments.map((payment) => (
        <PaymentCard {...payment} />
      ))}
    </div>
  );
};
