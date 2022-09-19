import { useState } from "react";
import { Expense } from "../../../../domain/Expense/Expense.model";
import { Payment } from "../../../../domain/Payment/Payment.model";
import { PaymentCardProps } from "../components/PaymentCard/PaymentCard";

export const useBuildTransactions = () => {
  const [transactions, setTransactions] = useState<PaymentCardProps[]>([]);

  const handleBuildTransactions = (data: (Expense | Payment)[]) => {
    const transanctions: PaymentCardProps[] = data.map((item) => {
      const hasPayment = item instanceof Payment;

      const title = hasPayment
        ? `${item.payerName.value} > ${item.beneficiaryName.value}`
        : item.friendName.value;
      const date = hasPayment ? item.date : item.createdAt;

      return {
        title,
        amount: item.amount.value,
        date: date.toYYMMDD(),
        description: item.description.value,
      };
    });

    setTransactions(transanctions);
  };

  return { transactions, handleBuildTransactions };
};
