import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";
import { InMemoryGroupRepository } from "./infrastructure/Group/InMemoryGroupRepository";
import { InMemoryUserRepository } from "./infrastructure/User/InMemoryUserRepository";
import { UuidUUIDGenerator } from "./infrastructure/vendor/UuidUUIDGenerator";

export const appDepsProvide = () => {
  container.register("UUIDGenerator", {
    useClass: UuidUUIDGenerator,
  });

  container.register(
    "UserRepository",
    {
      useClass: InMemoryUserRepository,
    },
    {
      lifecycle: Lifecycle.Singleton,
    }
  );

  container.register(
    "GroupRepository",
    {
      useClass: InMemoryGroupRepository,
    },
    {
      lifecycle: Lifecycle.Singleton,
    }
  );
};
