import { DatedDto } from "../../Shared/dtos/Dated.dto";

export interface GroupDto extends DatedDto {
  uuid: string;
  user: string;
  name: string;
  friends: string[];
}
