import { Fakerjs } from "../../../src/infrastructure/vendor/Fakerjs";
import { getContainer } from "./getContainer";

export const unitDepsRegister = () => {
  const container = getContainer();

  container.register("Faker", {
    useClass: Fakerjs,
  });
};
