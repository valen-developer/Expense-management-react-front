import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { useSignup } from "./hooks/useSignup";

export const Signup = () => {
  const { handleSignup, isSuccess } = useSignup();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignup({ email, password, passwordConfirmation });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            data-testid="email-input"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="form-input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            data-testid="password-input"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="form-input">
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Password Confirmation"
            data-testid="password-confirmation-input"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
          />
        </div>

        <Link to="/auth/signin">Do you have an account? Signin</Link>

        <button role="button" type="submit">
          Signup
        </button>

        {isSuccess && <p>Signup successfully</p>}
      </form>
    </div>
  );
};
