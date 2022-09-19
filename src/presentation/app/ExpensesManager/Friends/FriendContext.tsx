import { createContext } from "react";
import { Friend } from "../../../../domain/Friend/Friend.model";

interface FriendContextProps {
  friends: Friend[];
  addFriend: (friend: Friend) => void;
}

export const FriendContextInitialState: FriendContextProps = {
  friends: [],
  addFriend: function (friend: Friend) {
    this.friends = [...this.friends, friend];
  },
};

export const FriendContext = createContext<FriendContextProps>(
  FriendContextInitialState
);
