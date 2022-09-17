import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { Auth } from "./Auth/Auth";
import { authRoutes } from "./Auth/auth.router";
import { ExpensesManager } from "./ExpensesManager/ExpensesManager";
import { ExpensesManagerRouter } from "./ExpensesManager/expensesManager.router";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
        children: authRoutes,
      },
      {
        path: "/home",
        element: <ExpensesManager />,
        children: ExpensesManagerRouter,
      },

      {
        path: "",
        element: <Navigate to="/home" />,
      },
      {
        path: "*",
        element: <Navigate to="/home" />,
      },
    ],
  },
]);
