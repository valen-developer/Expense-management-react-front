import { useState } from "react";
import { container } from "tsyringe";
import { FriendGroupAdder } from "../../../../application/Group/FriendGroupAdder";
import { Group } from "../../../../domain/Group/Group.model";
import { Nullable } from "../../../../domain/Shared/types/Nullable.type";

export const useAddFriendToGroup = () => {
  const friendAdder = container.resolve(FriendGroupAdder);

  const [error, setError] = useState<Nullable<string>>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddFriendToGroup = (friendUuid: string, group: Group) => {
    friendAdder
      .add({
        friendUuid: friendUuid,
        group,
      })
      .then(() => {
        setIsSuccess(true);
        setError(null);
      })
      .catch((error) => {
        if (error instanceof Error) {
          return setError(error.message);
        }

        setError("An error has occurred");
      });
  };

  return {
    error,
    isSuccess,
    handleAddFriendToGroup,
  };
};
