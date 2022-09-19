import { Friend } from "../../../../../domain/Friend/Friend.model";
import { FriendCard } from "../FriendCard/FriendCard";

interface FriendsCollectionProps {
  friends: Friend[];
}

export const FriendsCollection = (props: FriendsCollectionProps) => {
  const { friends } = props;

  return (
    <div>
      {friends.map((friend) => (
        <FriendCard friend={friend} key={friend.uuid.value} />
      ))}
    </div>
  );
};
