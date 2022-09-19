import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { AddGroupButton } from "../components/AddGroupModal/AddGroupModal";
import { GroupCollection } from "../components/GroupsCollection/GroupCollection";

import { useFetchGroups } from "../hooks/useFetchGroups";

import styles from "./Home.module.scss";

export const Home = () => {
  const { user, groups } = useSelector((state: RootState) => ({
    user: state.auth.user,
    groups: state.group.groups,
  }));
  const { handleFetchGroups } = useFetchGroups();

  useEffect(() => {
    if (!user) return;

    handleFetchGroups({
      user_equals: user?.uuid.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <div className={styles.home__header}>
        <h2>{user?.email.value}</h2>
        <AddGroupButton />
      </div>

      <div className={styles.home__content}>
        <GroupCollection groups={groups} />
      </div>
    </div>
  );
};
