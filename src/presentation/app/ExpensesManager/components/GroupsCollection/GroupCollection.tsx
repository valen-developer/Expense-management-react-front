import { Link } from "react-router-dom";

import { Group } from "../../../../../domain/Group/Group.model";
import { GroupCard } from "../GroupCard/GroupCard";

import styles from "./GroupCollection.module.scss";

interface GroupCollectionProps {
  groups: Group[];
}

export const GroupCollection = (props: GroupCollectionProps) => {
  return (
    <div className={`${styles.collection_grid} fadeIn `}>
      {props.groups.map((group) => {
        return (
          <Link
            className={styles.collection_link}
            to={`/home/group/${group.uuid.value}`}
            key={group.uuid.value}
          >
            <GroupCard group={group} />
          </Link>
        );
      })}
    </div>
  );
};
