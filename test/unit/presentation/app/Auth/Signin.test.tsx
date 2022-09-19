import "reflect-metadata";
import "@testing-library/jest-dom";

import { act } from "react-dom/test-utils";
import { screen, fireEvent } from "@testing-library/react";

import { Signin } from "../../../../../src/presentation/app/Auth/Signin";
import { RendererHelper } from "../../../../helpers/presentation/RendererHelper";
import { UserMother } from "../../../../helpers/User/UserMother";
import { unitDepsRegister } from "../../../helpers/unitDepsRegister";
import { It, Mock } from "moq.ts";
import { UserRepository } from "../../../../../src/domain/User/interfaces/UserRepository.interface";
import { SigninDto } from "../../../../../src/domain/Auth/dtos/Signin.dto";
import { container } from "tsyringe";

jest.mock("react-redux", () => {
  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

describe("Signin", () => {
  beforeAll(() => {
    depsRegister();
  });

  it("should find anchor for signup", () => {
    RendererHelper.renderInRouter(Signin);

    const signupAnchor = screen.getByText(/signup/i);

    expect(signupAnchor).toBeInTheDocument();
  });

  it("should sigin and get navigation to home", async () => {
    RendererHelper.renderInRouter(Signin, [
      {
        path: "/home",
        Element: () => <div>Home</div>,
      },
    ]);

    const signinDto = UserMother.signinDto();

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    const singinButton = screen.getByRole("button", { name: /signin/i });

    fireEvent.change(emailInput, { target: { value: signinDto.email } });
    fireEvent.change(passwordInput, { target: { value: signinDto.password } });

    await act(async () => {
      fireEvent.click(singinButton);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});

const depsRegister = () => {
  const mockedUserRepository = new Mock<UserRepository>()
    .setup((instance) => instance.signin(It.IsAny<SigninDto>() as SigninDto))
    .returns(
      Promise.resolve({
        user: UserMother.random(),
        token: "token",
      })
    );

  container.register("UserRepository", {
    useValue: mockedUserRepository.object(),
  });

  unitDepsRegister();
};
