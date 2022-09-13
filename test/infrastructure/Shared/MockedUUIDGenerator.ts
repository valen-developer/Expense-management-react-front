import { UUIDGenerator } from "../../../src/domain/Shared/interfaces/UUIDGenerator.interface";

export class MockedUUIDGenerator implements UUIDGenerator {
  public generate(): string {
    const random =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return random;
  }
}
