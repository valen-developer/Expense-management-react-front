import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";
import { MockedAuthRepository } from "../infrastructure/Auth/MockedAuthRepository";
import { MockedGroupRepository } from "../infrastructure/Group/MockedGroupRepository";
import { MockedUUIDGenerator } from "../infrastructure/Shared/MockedUUIDGenerator";

export const unitTestingDepsRegister = () => {
  container.register("AuthRepository", {
    useClass: MockedAuthRepository,
  });

  container.register("UUIDGenerator", {
    useClass: MockedUUIDGenerator,
  });

  container.register(
    "GroupRepository",
    {
      useClass: MockedGroupRepository,
    },
    { lifecycle: Lifecycle.Singleton }
  );
};
