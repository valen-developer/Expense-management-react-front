import { useState } from "react";
import { ModalContainer } from "../../../Shared/ModalContainer/ModalContainer";
import { AddFriendForm } from "../AddFriendForm/AddFriendForm";

export const AddFriendButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => handleShow()}>
        Create Friend
      </button>
      <ModalContainer show={show} handleClose={handleClose}>
        <AddFriendForm />
      </ModalContainer>
    </div>
  );
};
