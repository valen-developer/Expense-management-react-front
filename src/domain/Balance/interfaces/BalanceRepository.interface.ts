import { Balance } from "../Balance.model";

export abstract class BalanceRepository {
  abstract getBalance(groupUUid: string): Promise<Balance>;
}
