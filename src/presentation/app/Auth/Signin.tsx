import { useNavigate } from "react-router-dom";

import { ChangeEvent, useEffect, useState } from "react";
import { useSignin } from "./hooks/useSignin";

export const Signin = () => {
  const navigate = useNavigate();

  const { isSuccess, handleSignin } = useSignin();

  useEffect(() => {
    if (!isSuccess) return;
    navigate("/home");
  }, [isSuccess, navigate]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignin({ email, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <button role="button" type="submit">
          Signin
        </button>
      </form>
    </div>
  );
};
