import { nanoid } from "nanoid";
import { UUIDGenerator } from "../../domain/Shared/interfaces/UUIDGenerator.interface";

export class NanoidUUIDGenerator implements UUIDGenerator {
  generate(): string {
    return nanoid();
  }
}
