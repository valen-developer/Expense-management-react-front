import { useContext, useState } from "react";
import { Nullable } from "../../../../../domain/Shared/types/Nullable.type";
import { UUID } from "../../../../../domain/Shared/valueObjects/UUID.valueObject";
import { GroupContext } from "../../Group/GroupContext";
import { useAddPayment } from "../../hooks/useAddPayment";

export const AddPaymentForm = () => {
  const { group, groupFriends, addPaymentToGroup } = useContext(GroupContext);

  const [selectedPayer, setSelectedPayer] = useState<Nullable<string>>();
  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<Nullable<string>>();

  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  const { handleAddPayment } = useAddPayment();

  const handlePayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPayer(event.target.value);
  };

  const handleBeneficiaryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedBeneficiary(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!group) return;

    const beneficiary = groupFriends.find((friend) =>
      friend.uuid.equals(new UUID(selectedBeneficiary ?? ""))
    );
    const payer = groupFriends.find((friend) =>
      friend.uuid.equals(new UUID(selectedPayer ?? ""))
    );

    if (!(beneficiary && payer)) return;

    handleAddPayment({
      amount,
      beneficiary: beneficiary.uuid.value,
      payer: payer.uuid.value,
      beneficiaryName: beneficiary.name.value,
      payerName: payer.name.value,
      description,
      date,
      group: group.uuid.value,
    })
      .then((payment) => {
        addPaymentToGroup(payment);
      })
      .catch(() => {
        console.error("Error adding payment");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          data-testid="description"
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <input
          type="number"
          data-testid="amount"
          name="amount"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <input
          type="date"
          data-testid="date"
          name="date"
          placeholder="Date"
          onChange={handleDateChange}
        />
        <select
          name="beneficiary"
          data-testid="beneficiary"
          onChange={handleBeneficiaryChange}
          value={selectedBeneficiary ?? ""}
        >
          <option value="" disabled selected>
            Choose Beneficiary
          </option>
          {groupFriends.map((friend) => (
            <option key={friend.uuid.value} value={friend.uuid.value}>
              {friend.name.value}
            </option>
          ))}
        </select>
        <select
          name="payer"
          data-testid="payer"
          onChange={handlePayerChange}
          value={selectedPayer ?? ""}
        >
          <option value="" disabled selected>
            Choose Payer
          </option>
          {groupFriends.map((friend) => (
            <option key={friend.uuid.value} value={friend.uuid.value}>
              {friend.name.value}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" data-testid="payment-submit">
          Add payment
        </button>
      </form>
    </div>
  );
};
