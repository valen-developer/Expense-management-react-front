import { ValueObject } from "./valueObject";

export class List<T> extends ValueObject<T[]> {
  constructor(value?: T[]) {
    super(value ?? []);
  }

  public toArray(): T[] {
    return this.value;
  }

  public length(): number {
    return this.value.length;
  }
}
