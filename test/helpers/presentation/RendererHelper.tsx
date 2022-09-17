import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render } from "@testing-library/react";

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
}
