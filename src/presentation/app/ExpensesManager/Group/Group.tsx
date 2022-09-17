import { useParams } from "react-router-dom";

export const Group = () => {
  const { uuid } = useParams<{ uuid: string }>();

  return <div>{uuid ?? "Sin uuid"}</div>;
};
