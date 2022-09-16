import { DatedDto } from "../../Shared/dtos/Dated.dto";

export interface PaymentDto extends DatedDto {
  uuid: string;
  group: string;
  payer: string;
  payerName: string;
  beneficiary: string;
  beneficiaryName: string;
  amount: number;
  description: string;
  date: Date;
}
