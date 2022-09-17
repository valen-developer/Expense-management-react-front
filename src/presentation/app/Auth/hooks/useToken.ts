export const useToken = () => {
  const handleSetToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const handleGetToken = () => {
    return localStorage.getItem("token");
  };

  const handleRemoveToken = () => {
    localStorage.removeItem("token");
  };

  return {
    handleSetToken,
    handleGetToken,
    handleRemoveToken,
  };
};
