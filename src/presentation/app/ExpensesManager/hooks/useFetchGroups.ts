import { useState } from "react";
import { container } from "tsyringe";
import { GroupFinder } from "../../../../application/Group/GroupFinder";
import { GroupQuery } from "../../../../domain/Group/dtos/GroupQuery.dto";
import { Group } from "../../../../domain/Group/Group.model";

export const useFetchGroups = () => {
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
