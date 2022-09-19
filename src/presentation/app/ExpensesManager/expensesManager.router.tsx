import { Navigate, RouteObject } from "react-router-dom";
import { Friends } from "./Friends/Friends";
import { Group } from "./Group/Group";
import { Home } from "./Home/Home";

export const ExpensesManagerRouter: RouteObject[] = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "friends",
    element: <Friends />,
  },
  {
    path: "group/:uuid",
    element: <Group />,
  },
  {
    path: "*",
    element: <Navigate to="/home/friends" />,
  },
];
