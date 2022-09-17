import { RouteObject, Navigate } from "react-router-dom";
import { Signin } from "./Signin";
import { Signup } from "./Signup";

export const authRoutes: RouteObject[] = [
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "",
    element: <Navigate to="signin" />,
  },
  {
    path: "*",
    element: <Navigate to="signin" />,
  },
];
