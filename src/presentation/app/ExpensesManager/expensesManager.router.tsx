import { RouteObject } from "react-router-dom";
import { Group } from "./Group/Group";
import { Home } from "./Home/Home";

export const ExpensesManagerRouter: RouteObject[] = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "group/:uuid",
    element: <Group />,
  },
];
