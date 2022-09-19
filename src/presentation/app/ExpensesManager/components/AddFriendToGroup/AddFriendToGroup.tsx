import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Nullable } from "../../../../../domain/Shared/types/Nullable.type";
import { RootState } from "../../../store/store";
import { GroupContext } from "../../Group/GroupContext";
import { useAddFriendToGroup } from "../../hooks/useAddFriendToGroup";
import { useFetchFriends } from "../../hooks/useFetchFriends";

import styles from "./AddFriendToGroup.module.scss";

export const AddFriendToGroup = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { group, addFriendToGroup } = useContext(GroupContext);
  const { friends, handleFindFriends } = useFetchFriends();

  const { isSuccess, handleAddFriendToGroup, error } = useAddFriendToGroup();

  useEffect(() => {
    if (!user) return;

    handleFindFriends({
      user_equals: user.uuid.value,
    });
  }, [user]);

  useEffect(() => {
    const friend = friends.find(
      (friend) => friend.uuid.value === selectedFriends
    );
    if (!friend) return;

    addFriendToGroup(friend);
  }, [isSuccess]);

  const [selectedFriends, setSelectedFriends] = useState<Nullable<string>>();

  const handleFriendChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSelectedFriends(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!group || !selectedFriends) return;

    console.log(selectedFriends);

    handleAddFriendToGroup(selectedFriends, group);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <select name="friend" onChange={handleFriendChange}>
          <option value="" disabled selected>
            Choose friend
          </option>
          {friends.map((friend) => (
            <option key={friend.uuid.value} value={friend.uuid.value}>
              {friend.name.value}
            </option>
          ))}
        </select>

        <button className="btn btn-primary">Add friend to group</button>

        {isSuccess && <div>Friend added to group</div>}
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};
