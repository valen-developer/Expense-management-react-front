import { useState } from "react";
import { ModalContainer } from "../../../Shared/ModalContainer/ModalContainer";
import { AddGroupForm } from "../AddGroupForm/AddGroupForm";

export const AddGroupButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => handleShow()}>
        Create group
      </button>
      <ModalContainer show={show} handleClose={handleClose}>
        <AddGroupForm />
      </ModalContainer>
    </>
  );
};
