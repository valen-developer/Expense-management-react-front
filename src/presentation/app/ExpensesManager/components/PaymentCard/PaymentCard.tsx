import styles from "./PaymentCard.module.scss";

export interface PaymentCardProps {
  title: string;
  description: string;
  amount: number;
  date: string;
}

export const PaymentCard = (props: PaymentCardProps) => {
  const { title, description, amount, date } = props;

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <span>{title}</span>
        <span className={styles.card__header_amount}>{`${amount}€`}</span>
      </div>

      <div className={styles.card__body}>
        <p>{description}</p>
      </div>

      <div className={styles.card__footer}>
        <span>{date}</span>
      </div>
    </div>
  );
};
