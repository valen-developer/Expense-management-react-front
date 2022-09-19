import { container } from "tsyringe";
import { BalaceFinder } from "../../../../application/Balance/BalanceFinder";

export const useFetchBalance = () => {
  const balanceFinder = container.resolve(BalaceFinder);

  const handleFetchBalance = (groupUUid: string) => {
    return balanceFinder.getBalance(groupUUid);
  };

  return {
    handleFetchBalance,
  };
};
