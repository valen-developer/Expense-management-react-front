import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Friend } from "../../../../domain/Friend/Friend.model";
import { RootState } from "../../store/store";
import { AddFriendButton } from "../components/AddFriendButton/AddFriendButton";
import { FriendsCollection } from "../components/FriendsCollection/FriendsCollection";

import { useFetchFriends } from "../hooks/useFetchFriends";
import { FriendContext } from "./FriendContext";

export const Friends = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { handleFindFriends, friends, setFriends } = useFetchFriends();

  useEffect(() => {
    if (!user) return;

    handleFindFriends({
      user_equals: user.uuid.value,
    });
  }, [user]);

  const handleAddFriend = (friend: Friend) => {
    setFriends([...friends, friend]);
  };

  return (
    <FriendContext.Provider value={{ addFriend: handleAddFriend, friends }}>
      <AddFriendButton />

      <FriendsCollection friends={friends} />
    </FriendContext.Provider>
  );
};
