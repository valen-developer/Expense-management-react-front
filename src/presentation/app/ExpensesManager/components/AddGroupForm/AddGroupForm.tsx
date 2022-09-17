import { useState } from "react";
import { useAddGroup } from "../../hooks/useAddGroup";

import styles from "./AddGroupForm.module.scss";

export const AddGroupForm = () => {
  const [groupName, setGroupName] = useState<string>("");

  const { handleCreateGroup, group } = useAddGroup();

  const handleGroupNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateGroup({ name: groupName });
  };

  return (
    <div>
      <h2 className={styles.title}>Create new group of friend!</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Group name"
          onChange={handleGroupNameChange}
          data-testid="group-name-input"
        />

        <button
          className="btn btn-primary"
          type="submit"
          data-testid="submit-create-group"
        >
          Create Group
        </button>
        {group && <p>Group created</p>}
        <span></span>
      </form>
    </div>
  );
};
