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

  name(regex?: RegExp): string {
    if (!regex) return faker.name.fullName();

    let name = faker.name.firstName();
    while (!regex.test(name)) {
      name = faker.name.firstName();
    }

    return name;
  }

  uuid(): string {
    return faker.datatype.uuid();
  }

  email(): string {
    return faker.internet.email();
  }

  paragraph(max = 3): string {
    return faker.lorem.paragraph(max);
  }

  date(): Date {
    return faker.date.recent();
  }
}
