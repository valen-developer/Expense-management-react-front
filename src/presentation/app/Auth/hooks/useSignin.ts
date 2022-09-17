import { useDispatch } from "react-redux";
import { useState } from "react";
import { container } from "tsyringe";

import { UserSigner } from "../../../../application/Auth/UserSigner";
import { SigninDto } from "../../../../domain/Auth/dtos/Signin.dto";
import { login } from "../store/auth.slice";
import { useToken } from "./useToken";

export const useSignin = () => {
  const dispatch = useDispatch();
  const { handleSetToken, handleRemoveToken } = useToken();

  const userSigner = container.resolve(UserSigner);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignin = (data: SigninDto) => {
    setLoading(true);
    userSigner
      .sign(data)
      .then(({ user, token }) => {
        setLoading(false);
        setSuccess(true);

        dispatch(login(user));

        handleSetToken(token);
      })
      .catch((error: Error) => {
        error;
        setLoading(false);
        setError(error.message);

        handleRemoveToken();
      });
  };

  return {
    isLoading,
    isSuccess,
    error,
    handleSignin,
  };
};
