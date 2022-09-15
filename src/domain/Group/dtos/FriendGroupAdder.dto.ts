import { Group } from "../Group.model";

export interface FriendGroupAdderDto {
  group: Group;
  friendUuid: string;
}
