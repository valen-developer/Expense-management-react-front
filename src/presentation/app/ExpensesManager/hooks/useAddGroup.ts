import { container } from "tsyringe";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GroupCreator } from "../../../../application/Group/GroupCreator";
import { Group } from "../../../../domain/Group/Group.model";
import { Nullable } from "../../../../domain/Shared/types/Nullable.type";
import { addGroup } from "../store/group.slice";
import { RootState } from "../../store/store";

export const useAddGroup = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const groupCreator = container.resolve<GroupCreator>(GroupCreator);

  const [group, setGroup] = useState<Nullable<Group>>(null);
  const [error, setError] = useState<Nullable<string>>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateGroup = (params: { name: string }) => {
    if (!user) {
      setError("User is not logged");

      return;
    }

    setIsLoading(true);

    groupCreator
      .create({
        user: user.uuid.value,
        name: params.name,
        friends: [],
      })
      .then((group) => {
        setGroup(group);
        setIsLoading(false);

        dispatch(addGroup(group));
      })
      .catch((error) => {
        if (error instanceof Error) setError(error.message);
        setError("Error creating group");
        setIsLoading(false);
      });
  };

  return {
    handleCreateGroup,
    group,
    error,
    isLoading,
  };
};
