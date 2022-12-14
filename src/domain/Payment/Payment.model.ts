import { FriendName } from "../Friend/valueObjects/FriendName.valueObject";
import { Dated } from "../Shared/Dated.model";
import { WithOptionals } from "../Shared/types/WithOptionals.type";
import { UUID } from "../Shared/valueObjects/UUID.valueObject";
import { PaymentDto } from "./dtos/Payment.dto";
import { PaymentAmount } from "./valueObjects/PaymentAmount.valueObject";
import { PaymentDate } from "./valueObjects/PaymentDate.valueObject";
import { PaymentDescription } from "./valueObjects/PaymentDescription.valueObject";

export class Payment extends Dated {
  public readonly uuid: UUID;
  public readonly group: UUID;

  public readonly payer: UUID;
  public readonly payerName: FriendName;
  public readonly beneficiary: UUID;
  public readonly beneficiaryName: FriendName;

  public readonly amount: PaymentAmount;
  public readonly description: PaymentDescription;
  public readonly date: PaymentDate;

  constructor(params: WithOptionals<PaymentDto, "createdAt" | "updatedAt">) {
    const { createdAt, updatedAt } = params;
    super({ createdAt, updatedAt });

    this.uuid = new UUID(params.uuid);
    this.group = new UUID(params.group);
    this.payer = new UUID(params.payer);
    this.payerName = new FriendName(params.payerName);
    this.beneficiary = new UUID(params.beneficiary);
    this.beneficiaryName = new FriendName(params.beneficiaryName);
    this.amount = new PaymentAmount(params.amount);
    this.description = new PaymentDescription(params.description);
    this.date = new PaymentDate(params.date);
  }

  public toDto(): PaymentDto {
    return {
      uuid: this.uuid.value,
      group: this.group.value,
      payer: this.payer.value,
      payerName: this.payerName.value,
      beneficiary: this.beneficiary.value,
      beneficiaryName: this.beneficiaryName.value,
      amount: this.amount.value,
      description: this.description.value,
      date: this.date.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
