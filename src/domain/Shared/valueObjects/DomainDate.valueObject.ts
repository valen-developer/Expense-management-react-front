import { ValueObject } from "./valueObject";

export class DomainDate extends ValueObject<Date> {
  constructor(value?: Date) {
    super(value ?? new Date());
  }

  public toYYMMDD(): string {
    const year = this.value.getFullYear();
    const month = this.value.getMonth() + 1;
    const day = this.value.getDate();

    const yearString = year < 10 ? `0${year}` : `${year}`;
    const monthString = month < 10 ? `0${month}` : `${month}`;
    const dayString = day < 10 ? `0${day}` : `${day}`;

    return `${yearString}-${monthString}-${dayString}`;
  }
}
