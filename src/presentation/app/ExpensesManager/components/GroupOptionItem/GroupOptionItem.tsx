import { useState } from "react";
import { ModalContainer } from "../../../Shared/ModalContainer/ModalContainer";

interface GroupOptionItemProps {
  title: string;
  children: React.ReactNode;
}

export const GroupOptionItem = (props: GroupOptionItemProps) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <button onClick={() => handleShow()}>{props.title}</button>
      <ModalContainer show={show} handleClose={handleClose}>
        {props.children}
      </ModalContainer>
    </div>
  );
};
