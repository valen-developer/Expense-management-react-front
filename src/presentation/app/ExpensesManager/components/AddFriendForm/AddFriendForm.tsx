import { useContext, useEffect, useState } from "react";
import { Friend } from "../../../../../domain/Friend/Friend.model";
import { Nullable } from "../../../../../domain/Shared/types/Nullable.type";
import { FriendContext } from "../../Friends/FriendContext";
import { useCreateFriend } from "../../hooks/useCrateFriend";

export const AddFriendForm = () => {
  const { addFriend } = useContext(FriendContext);
  const [name, setName] = useState("");
  const [message, setMessage] = useState<Nullable<string>>(null);

  const { handleCreateFriend } = useCreateFriend();

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleCreateFriend(name)
      .then((friend) => {
        addFriend(friend);

        setName("");
        setMessage("Friend added successfully");
      })
      .catch((error) => {
        if (error instanceof Error) return setMessage(error.message);
        setMessage("Something went wrong");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChangeName} />
        <button type="submit">Add Friend</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};
