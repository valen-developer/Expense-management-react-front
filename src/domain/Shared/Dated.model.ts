import { DatedDto } from "./dtos/Dated.dto";
import { DomainDate } from "./valueObjects/DomainDate.valueObject";

export abstract class Dated {
  public readonly createdAt: DomainDate;
  public readonly updatedAt: DomainDate;

  constructor(params: Partial<DatedDto>) {
    this.createdAt = new DomainDate(params.createdAt);
    this.updatedAt = new DomainDate(params.updatedAt);
  }
}
