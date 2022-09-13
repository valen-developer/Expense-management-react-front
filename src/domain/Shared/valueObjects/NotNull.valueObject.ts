import { ValueObject } from "./ValueObject";

export abstract class NotNullValueObjet<T> extends ValueObject<T> {
  constructor(value: T, entityName: string) {
    super(value);

    this.checkIfValueIsNotNull(value, entityName);
  }

  private checkIfValueIsNotNull(value: T, entityName: string): void {
    const isNull = value === null || value === undefined;
    if (isNull) {
      throw new Error(`${entityName} cannot be null or undefined`);
    }
  }
}
