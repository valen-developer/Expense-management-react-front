import { Friend } from "../../Friend/Friend.model";

export interface FriendBalanceDto {
  friend: Friend;
  totalExpense: number;
  totalReceived: number;
  totalPayed: number;
  balance: number;
}
