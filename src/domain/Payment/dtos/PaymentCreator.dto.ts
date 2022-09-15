export interface PaymentCreatorDto {
  group: string;
  payer: string;
  beneficiary: string;
  amount: number;
  description: string;
  date: Date;
}
