import { useState } from "react";
import { container } from "tsyringe";
import { UserSigner } from "../../../../application/Auth/UserSigner";
import { SigninDto } from "../../../../domain/Auth/dtos/Signin.dto";

export const useSignin = () => {
  const userSigner = container.resolve(UserSigner);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignin = (data: SigninDto) => {
    setLoading(true);
    userSigner
      .sign(data)
      .then(() => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((error: Error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return {
    isLoading,
    isSuccess,
    error,
    handleSignin,
  };
};
