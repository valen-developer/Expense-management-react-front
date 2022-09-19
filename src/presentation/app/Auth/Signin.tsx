import { Link, useNavigate } from "react-router-dom";

import { ChangeEvent, useEffect, useState } from "react";
import { useSignin } from "./hooks/useSignin";

import styles from "./Auth.module.scss";

export const Signin = () => {
  const navigate = useNavigate();

  const { isSuccess, handleSignin, error } = useSignin();

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
      <div className={styles.auth__header}>
        <h1>Signin</h1>
      </div>
      <form onSubmit={handleSubmit} className={styles.auth_form}>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />

        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />

        <Link to="/auth/signup">Don´t have and account? Signup</Link>

        <button role="button" type="submit" className="btn btn-primary">
          Signin
        </button>
      </form>

      {error && <p data-testid="error-message">{error}</p>}
    </div>
  );
};
