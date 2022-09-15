import { DatedDto } from "../../Shared/dtos/Dated.dto";

export interface PaymentDto extends DatedDto {
  uuid: string;
  group: string;
  payer: string;
  beneficiary: string;
  amount: number;
  description: string;
  date: Date;
}
