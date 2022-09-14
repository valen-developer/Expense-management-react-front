import { NotNullValueObject } from "../../Shared/valueObjects/NotNull.valueObject";
import { FriendNameInvalidException } from "../exceptions/FriendNameInvalid.exception";

export class FriendName extends NotNullValueObject<string> {
  public static readonly INVALID_MESSAGE =
    "Name should be between 2 and 30 characters and not numbers (spaces and points are allowed)";
  public static readonly VALID_NAME_REGEX = /^[a-zA-Z0-9\s.]{2,30}$/;

  constructor(value: string) {
    super(value, "Friend name");

    this.checkName(value);
  }

  private checkName(value: string): void {
    const isValid = FriendName.VALID_NAME_REGEX.test(value);

    if (!isValid) {
      throw new FriendNameInvalidException();
    }
  }
}
