import { v4 } from "uuid";

import { UUIDGenerator } from "../../domain/Shared/interfaces/UUIDGenerator.interface";

export class UuidUUIDGenerator implements UUIDGenerator {
  generate(): string {
    return v4();
  }
}
