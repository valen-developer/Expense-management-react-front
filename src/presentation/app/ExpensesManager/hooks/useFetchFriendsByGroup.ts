import { useState } from "react";
import { useSelector } from "react-redux";
import { container } from "tsyringe";
import { FriendFinder } from "../../../../application/Friend/FriendFinder";
import { Friend } from "../../../../domain/Friend/Friend.model";
import { Group } from "../../../../domain/Group/Group.model";
import { Nullable } from "../../../../domain/Shared/types/Nullable.type";
import { asyncMap } from "../../../../helpers/asyncMap";
import { RootState } from "../../store/store";

export const useFetchFriendsByGroup = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [friends, setFriends] = useState<Friend[]>([]);
  const [error, setError] = useState<Nullable<string>>(null);

  const friendFinder = container.resolve(FriendFinder);

  const handleFetchFriendsByGroup = (group: Group) => {
    if (!user) return;

    const friendsUuid = group.friends.toArray();

    asyncMap(friendsUuid, async (uuid) => {
      const friend = await friendFinder.find({
        uuid,
        user: user.uuid.value,
      });
      return friend;
    })
      .then((array) => {
        console.log(array);
        setFriends(array);
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Error) {
          return setError(error.message);
        }
        setError("An error ocurred");
      });
  };

  return { friends, error, handleFetchFriendsByGroup };
};
