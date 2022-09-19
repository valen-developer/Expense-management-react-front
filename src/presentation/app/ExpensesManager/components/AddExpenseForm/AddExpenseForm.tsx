import { useContext, useEffect, useState } from "react";
import { UUID } from "../../../../../domain/Shared/valueObjects/UUID.valueObject";
import { GroupContext } from "../../Group/GroupContext";
import { useExpenseCreation } from "../../hooks/useExpenseCreation";

export const AddExpenseForm = () => {
  const { group, groupFriends, addExpenseToGroup } = useContext(GroupContext);
  const { handleExpenseCreation } = useExpenseCreation();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedFriend, setSelectedFriend] = useState("");

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleFriendChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFriend(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const friend = groupFriends.find((friend) =>
      friend.uuid.equals(new UUID(selectedFriend))
    );
    if (!friend || !group) return;

    handleExpenseCreation({
      description,
      amount,
      friend: friend.uuid.value,
      friendName: friend.name.value,
      group: group.uuid.value,
    })
      .then((expense) => {
        addExpenseToGroup(expense);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          onChange={handleDescriptionChange}
        />
        <input
          type="number"
          name="amount"
          min="0"
          onChange={handleAmountChange}
        />
        <select name="payer" onChange={handleFriendChange}>
          <option value="" disabled selected></option>
          {groupFriends.map((friend) => (
            <option value={friend.uuid.value}>{friend.name.value}</option>
          ))}
        </select>

        <button className="btn btn-primary">Add expense</button>
      </form>
    </div>
  );
};
