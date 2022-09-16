export interface PaymentCreatorDto {
  group: string;
  payer: string;
  payerName: string;
  beneficiary: string;
  beneficiaryName: string;
  amount: number;
  description: string;
  date: Date;
}
