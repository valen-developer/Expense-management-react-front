import { Link } from "react-router-dom";

import { Group } from "../../../../../domain/Group/Group.model";
import { GroupCard } from "../GroupCard/GroupCard";

interface GroupCollectionProps {
  groups: Group[];
}

export const GroupCollection = (props: GroupCollectionProps) => {
  return (
    <div>
      {props.groups.map((group) => {
        return (
          <Link to={`/home/group/${group.uuid.value}`} key={group.uuid.value}>
            <GroupCard group={group} />
          </Link>
        );
      })}
    </div>
  );
};
