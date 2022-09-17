import "reflect-metadata";

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Signup } from "../../../../src/presentation/app/Auth/Signup";
import { UserMother } from "../../../helpers/User/UserMother";
import { appDepsProvide } from "../../../../src/depsProvide";
import { RendererHelper } from "../../../helpers/presentation/RendererHelper";

describe("Signup", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should signup", async () => {
    RendererHelper.renderInRouter(Signup, []);

    const signupDto = UserMother.signupDto({
      password: "ValidPassword123",
      passwordConfirmation: "ValidPassword123",
    });

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmationInput = screen.getByTestId(
      "password-confirmation-input"
    );

    const singupButton = screen.getByRole("button", { name: /signup/i });

    fireEvent.change(emailInput, { target: { value: signupDto.email } });
    fireEvent.change(passwordInput, {
      target: { value: signupDto.password },
    });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: signupDto.passwordConfirmation },
    });

    await act(async () => {
      fireEvent.click(singupButton);
      await new Promise((resolve) => setTimeout(resolve, 200));
    });

    expect(screen.getByText(/signup successfully/i)).toBeInTheDocument();
  });
});

const depsRegister = () => {
  appDepsProvide();
};
