import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export const ExpensesManager = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <div>
      {isAuthenticated ? (
        <div>Authenticated</div>
      ) : (
        <div>Not Authenticated</div>
      )}
    </div>
  );
};
