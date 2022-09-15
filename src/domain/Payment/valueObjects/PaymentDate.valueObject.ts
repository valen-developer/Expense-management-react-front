import { DomainDate } from "../../Shared/valueObjects/DomainDate.valueObject";

export class PaymentDate extends DomainDate {
  constructor(value: Date) {
    super(value);
  }
}
