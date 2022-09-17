/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import { RootState, store } from "../../../src/presentation/app/store/store";
import { useEffect } from "react";
import { setGroups } from "../../../src/presentation/app/ExpensesManager/store/group.slice";
import { login } from "../../../src/presentation/app/Auth/store/auth.slice";

export class RendererHelper {
  public static renderInRouter(
    Component: React.FC,
    routes: { path: string; Element: React.FC }[] = []
  ) {
    return render(
      <MemoryRouter>
        <Routes>
          {routes.map(({ Element, path }, index) => (
            <Route
              key={index.toString() + path}
              path={path}
              element={<Element />}
            />
          ))}

          <Route path="*" element={<Component />} />
        </Routes>
      </MemoryRouter>
    );
  }

  public static renderInRouterWithProvider(
    Component: React.FC,
    routes: { path: string; Element: React.FC }[] = []
  ) {
    return RendererHelper.renderInRouter(
      () => (
        <Provider store={store}>
          <Component />
        </Provider>
      ),
      routes
    );
  }

  public static Wrapper(
    Component: React.FC,
    initialStoreState?: RootState,
    routes: { path: string; Element: React.FC }[] = []
  ) {
    const wrapper: React.FC = () => {
      const dispatch = store.dispatch;

      useEffect(() => {
        if (!initialStoreState) return;

        const { auth, group } = initialStoreState;
        const { user } = auth;
        const { groups } = group;

        dispatch(setGroups(groups ?? []));

        if (!user) return;
        dispatch(login(user));
      }, []);

      return <Component />;
    };

    return RendererHelper.renderInRouterWithProvider(wrapper, routes);
  }
}
