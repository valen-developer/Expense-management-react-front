import { faker } from "@faker-js/faker";

import { Faker } from "../../domain/Shared/interfaces/Faker.interface";

export class Fakerjs implements Faker {
  num(options?: { min?: number; max?: number }): number {
    return faker.datatype.number(options);
  }

  password(): string {
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    return faker.internet.password(undefined, undefined, regex);
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
}
