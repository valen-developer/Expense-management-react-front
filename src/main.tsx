import "reflect-metadata";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { appDepsProvide } from "./depsProvide";
import { store } from "./presentation/app/store/store";
import { appRouter } from "./presentation/app/app.router";

appDepsProvide();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
