import "reflect-metadata";
import { container } from "tsyringe";
import { MockedAuthRepository } from "../infrastructure/Auth/MockedAuthRepository";

export const unitTestingDepsRegister = () => {
  container.register("AuthRepository", {
    useClass: MockedAuthRepository,
  });
};
