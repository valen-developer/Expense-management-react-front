import { Group } from "../../../../../domain/Group/Group.model";

import styles from "./GroupCard.module.scss";

interface GroupCardProps {
  group: Group;
}

export const GroupCard = (props: GroupCardProps) => {
  const { group } = props;

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <h3>{group.name.value}</h3>
      </div>
      <div className={styles.card__footer}>
        <span>{`${group.friends.length()} amigos`}</span>
      </div>
    </div>
  );
};
