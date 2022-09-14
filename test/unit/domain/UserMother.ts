import { inject } from "tsyringe";

import { Faker } from "../../../src/domain/Shared/interfaces/Faker.interface";

export class UserMother {
  constructor(@inject("Faker") private readonly faker: Faker) {}
}
