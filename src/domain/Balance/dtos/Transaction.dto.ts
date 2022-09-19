import { Friend } from "../../Friend/Friend.model";

export interface Transaction {
  payer: Friend;
  receiver: Friend;
  amount: number;
}
