import "reflect-metadata";
import { container } from "tsyringe";
import { InMemoryUserRepository } from "./infrastructure/User/InMemoryUserRepository";
import { UuidUUIDGenerator } from "./infrastructure/vendor/UuidUUIDGenerator";

export const appDepsProvide = () => {
  container.register("UUIDGenerator", {
    useClass: UuidUUIDGenerator,
  });

  container.register("UserRepository", {
    useClass: InMemoryUserRepository,
  });
};
