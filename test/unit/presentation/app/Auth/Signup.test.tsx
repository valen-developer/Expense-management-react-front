import { unitDepsRegister } from "../../../helpers/unitDepsRegister";
import { container } from "tsyringe";

import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { It, Mock } from "moq.ts";
import { act } from "react-dom/test-utils";
import { UserRepository } from "../../../../../src/domain/User/interfaces/UserRepository.interface";
import { User } from "../../../../../src/domain/User/User.model";
import { Signup } from "../../../../../src/presentation/app/Auth/Signup";
import { UserMother } from "../../../../helpers/User/UserMother";
import { RendererHelper } from "../../../../helpers/presentation/RendererHelper";

describe("Signup", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should find anchor for singin", () => {
    RendererHelper.renderInRouter(Signup, []);

    const singinAnchor = screen.getByText(/signin/i);

    expect(singinAnchor).toBeInTheDocument();
  });

  it("should find text 'Singup'", () => {
    RendererHelper.renderInRouter(Signup, []);

    const singupText = screen.getAllByText(/signup/i);

    expect(singupText.length).toBeGreaterThan(0);
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
  const mockedUserRepository = new Mock<UserRepository>()
    .setup((instance) => instance.signup(It.IsAny<User>() as User))
    .returns(Promise.resolve());

  container.register("UserRepository", {
    useValue: mockedUserRepository.object(),
  });

  unitDepsRegister();
};
