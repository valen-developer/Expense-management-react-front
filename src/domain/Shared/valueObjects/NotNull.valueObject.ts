import { NullException } from "../exceptions/Null.exception";
import { ValueObject } from "./valueObject";

export abstract class NotNullValueObject<T> extends ValueObject<T> {
  constructor(value: T, entity: string) {
    super(value);

    this.checkIfNull(value, entity);
  }

  public static isNotNull<T>(value: T): boolean {
    return value !== null && value !== undefined;
  }

  private checkIfNull(value: T, entity: string): void {
    if (!NotNullValueObject.isNotNull(value)) {
      throw new NullException(entity);
    }
  }
}
