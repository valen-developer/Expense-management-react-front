import { container } from "tsyringe";
import { PaymentCreator } from "../../../../application/Payment/PaymentCreator";
import { PaymentCreatorDto } from "../../../../domain/Payment/dtos/PaymentCreator.dto";

export const useAddPayment = () => {
  const paymentCreator = container.resolve(PaymentCreator);

  const handleAddPayment = (paymentCreatorDto: PaymentCreatorDto) => {
    return paymentCreator.create(paymentCreatorDto);
  };

  return {
    handleAddPayment,
  };
};
