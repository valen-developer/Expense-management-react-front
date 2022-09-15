import { DatedDto } from "../../Shared/dtos/Dated.dto";

export interface ExpenseDto extends DatedDto {
  uuid: string;
  friend: string;
  group: string;
  amount: number;
  description: string;
}
