import { useState } from "react";
import { container } from "tsyringe";
import { UserSignupper } from "../../../../application/Auth/UserSignupper";
import { UserSignupDto } from "../../../../domain/Auth/dtos/UserSignup.dto";

export const useSignup = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(false);

  const userSignupper = container.resolve<UserSignupper>(UserSignupper);

  const handleSignup = (dto: UserSignupDto) => {
    setLoading(true);
    userSignupper
      .signup(dto)
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((error: Error) => {
        const message = error.message;
        setError(message);
      });
  };

  return { isLoading, isSuccess, error, handleSignup };
};
