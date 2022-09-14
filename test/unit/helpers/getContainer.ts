import "reflect-metadata";

import { container, DependencyContainer } from "tsyringe";

export const getContainer = (): DependencyContainer => {
  return container;
};
