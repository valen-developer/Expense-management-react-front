export class List<T> {
  protected value: T[] = [];

  constructor(value?: T[]) {
    this.value = value ?? [];
  }

  public toArray(): T[] {
    return this.value;
  }

  public length(): number {
    return this.value.length;
  }

  public push(item: T): void {
    this.value = [...this.value, item];
  }
}
