import { Friend } from "../../../../../domain/Friend/Friend.model";

interface FriendCardProps {
  friend: Friend;
}

export const FriendCard = (props: FriendCardProps) => {
  const { friend } = props;

  return <div>{friend.name.value}</div>;
};
