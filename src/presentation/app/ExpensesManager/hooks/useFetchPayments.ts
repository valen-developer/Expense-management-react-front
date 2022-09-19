import { useState } from "react";
import { container } from "tsyringe";
import { PaymentFinder } from "../../../../application/Payment/PaymentFinder";
import { PaymentQuery } from "../../../../domain/Payment/dtos/PaymentQuery.dto";
import { Payment } from "../../../../domain/Payment/Payment.model";
import { Nullable } from "../../../../domain/Shared/types/Nullable.type";

export const useFetchPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [error, setError] = useState<Nullable<string>>(null);

  const paymentFinder = container.resolve(PaymentFinder);

  const handleFetchPayments = (query: PaymentQuery) => {
    paymentFinder
      .filter(query)
      .then((payments) => {
        setPayments(payments);
      })
      .catch((error) => {
        if (error instanceof Error) {
          return setError(error.message);
        }

        setError("An unexpected error occurred");
      });
  };

  const handleAddPayment = (payment: Payment) => {
    setPayments((payments) => [...payments, payment]);
  };

  return { payments, error, handleFetchPayments, handleAddPayment };
};
