import { container } from "tsyringe";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { GroupFinder } from "../../../../application/Group/GroupFinder";
import { GroupQuery } from "../../../../domain/Group/dtos/GroupQuery.dto";
import { Group } from "../../../../domain/Group/Group.model";
import { setGroups as setGlobalGroups } from "../store/group.slice";

export const useFetchGroups = () => {
  const dispatch = useDispatch();

  const groupFinder = container.resolve<GroupFinder>(GroupFinder);

  const [isLoading, setLoading] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);

  const handleFetchGroups = (query: GroupQuery) => {
    setLoading(true);

    groupFinder
      .filter(query)
      .then((groups) => {
        setGroups(groups);
        setLoading(false);

        dispatch(setGlobalGroups(groups));
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return {
    isLoading,
    groups,
    handleFetchGroups,
  };
};
