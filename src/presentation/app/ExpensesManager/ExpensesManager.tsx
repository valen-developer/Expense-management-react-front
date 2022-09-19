import { Outlet, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar/Navbar";

export const ExpensesManager = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) return;

    navigate("/auth");
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
