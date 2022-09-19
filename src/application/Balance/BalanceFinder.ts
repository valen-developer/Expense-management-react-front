import { inject, injectable } from "tsyringe";
import { Balance } from "../../domain/Balance/Balance.model";
import { BalanceRepository } from "../../domain/Balance/interfaces/BalanceRepository.interface";

@injectable()
export class BalaceFinder {
  constructor(
    @inject("BalanceRepository") private balanceRepository: BalanceRepository
  ) {}

  async getBalance(groupUUid: string): Promise<Balance> {
    return await this.balanceRepository.getBalance(groupUUid);
  }
}
