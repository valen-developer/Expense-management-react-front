import { Mock } from "moq.ts";

import { UUIDGenerator } from "../../../src/domain/Shared/interfaces/UUIDGenerator.interface";
import { Fakerjs } from "../../../src/infrastructure/vendor/Fakerjs";
import { getContainer } from "./getContainer";

export const unitDepsRegister = () => {
  const container = getContainer();

  const faker = new Fakerjs();

  container.register("Faker", {
    useValue: faker,
  });

  const mockerUUIDGenerator = new Mock<UUIDGenerator>()
    .setup((instance) => instance.generate())
    .returns(faker.uuid())
    .object();

  container.register("UUIDGenerator", {
    useValue: mockerUUIDGenerator,
  });
};
