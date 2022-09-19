import { Balance } from "../../../src/domain/Balance/Balance.model";
import { BalanceDto } from "../../../src/domain/Balance/dtos/Balance.dto";
import { FriendBalanceDto } from "../../../src/domain/Balance/dtos/FriendBalance.dto";
import { FriendBalance } from "../../../src/domain/Balance/FriendBalance.model";
import { FriendBalanceList } from "../../../src/domain/Balance/valueObjects/FriendBalanceList.valueObjec";
import { Nullable } from "../../../src/domain/Shared/types/Nullable.type";
import { Fakerjs } from "../../../src/infrastructure/vendor/Fakerjs";
import { FriendMother } from "../Friend/FriendMother";

const faker = new Fakerjs();

export class BalanceMother {
  public static ramdon(
    params?: FriendBalanceDto,
    friendBalanceList?: Nullable<FriendBalanceList>
  ): Balance {
    const defaultParams: BalanceDto = {
      friendsBalance: (
        friendBalanceList ?? BalanceMother.randomFriendsBalanceList(3, params)
      ).toArray(),
    };

    return new Balance(defaultParams);
  }

  public static randomFriendsBalance(
    params?: Partial<FriendBalanceDto>
  ): FriendBalance {
    const defaultParams: FriendBalanceDto = {
      friend: FriendMother.random(),
      totalExpense: faker.num(),
      totalPayed: faker.num(),
      totalReceived: faker.num(),
      balance: faker.num(),
    };

    return new FriendBalance({ ...defaultParams, ...params });
  }

  public static randomFriendsBalanceList(
    len = 3,
    params?: FriendBalanceDto
  ): FriendBalanceList {
    const friendsBalance = [];

    for (let i = 0; i < len; i++) {
      friendsBalance.push(this.randomFriendsBalance(params));
    }

    return new FriendBalanceList(friendsBalance);
  }
}
