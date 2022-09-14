import { faker } from "@faker-js/faker";

import { Faker } from "../../domain/Shared/interfaces/Faker.interface";

export class Fakerjs implements Faker {
  num(options?: { min?: number; max?: number }): number {
    return faker.datatype.number(options);
  }

  password(options?: { regex: RegExp; len?: number }): string {
    return faker.internet.password(
      options?.len || 8,
      true,
      options?.regex,
      "1A"
    );
  }

  name(): string {
    return faker.name.fullName();
  }

  uuid(): string {
    return faker.datatype.uuid();
  }

  email(): string {
    return faker.internet.email();
  }

  paragraph(max: number): string {
    return faker.lorem.paragraph(max);
  }

  date(): Date {
    return faker.date.recent();
  }
}
