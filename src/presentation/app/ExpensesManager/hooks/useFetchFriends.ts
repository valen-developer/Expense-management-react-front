import { useState } from "react";
import { container } from "tsyringe";
import { FriendFinder } from "../../../../application/Friend/FriendFinder";
import { FriendQuery } from "../../../../domain/Friend/dtos/FriendQuery.dto";
import { Friend } from "../../../../domain/Friend/Friend.model";
import { Nullable } from "../../../../domain/Shared/types/Nullable.type";

export const useFetchFriends = () => {
  const friendFinder = container.resolve(FriendFinder);

  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Nullable<string>>(null);

  const handleFindFriends = (query: FriendQuery) => {
    setLoading(true);

    friendFinder
      .filter(query)
      .then((friends) => {
        setLoading(false);
        setFriends(friends);
      })
      .catch((error) => {
        setLoading(false);
        if (error instanceof Error) return setError(error.message);

        setError("Not found friends");
      });
  };

  return {
    friends,
    isLoading,
    error,
    handleFindFriends,
    setFriends,
  };
};
