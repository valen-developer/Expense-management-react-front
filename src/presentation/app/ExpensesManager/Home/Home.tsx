import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { GroupCollection } from "../components/GroupsCollection/GroupCollection";

import { useFetchGroups } from "../hooks/useFetchGroups";

export const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { groups, handleFetchGroups } = useFetchGroups();

  useEffect(() => {
    if (!user) return;

    handleFetchGroups({
      user_equals: user?.uuid.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <GroupCollection groups={groups} />
    </div>
  );
};
