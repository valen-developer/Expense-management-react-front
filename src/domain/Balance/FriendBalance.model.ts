import { Friend } from "../Friend/Friend.model";
import { FriendBalanceDto } from "./dtos/FriendBalance.dto";

export class FriendBalance {
  public readonly friend: Friend;
  public readonly totalExpense: number;
  public readonly totalReceived: number;
  public readonly totalPayed: number;
  public readonly balance: number;

  constructor(params: FriendBalanceDto) {
    this.friend = params.friend;
    this.totalExpense = params.totalExpense;
    this.totalReceived = params.totalReceived;
    this.totalPayed = params.totalPayed;
    this.balance = params.balance;
  }

  public toDto(): FriendBalanceDto {
    return {
      friend: this.friend,
      totalExpense: this.totalExpense,
      totalReceived: this.totalReceived,
      totalPayed: this.totalPayed,
      balance: this.balance,
    };
  }
}
