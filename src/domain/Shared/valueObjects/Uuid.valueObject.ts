import { NotNullValueObjet } from "./NotNull.valueObject";

export class UUID extends NotNullValueObjet<string> {
  constructor(value: string) {
    super(value, "UUID");
  }
}
