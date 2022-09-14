export abstract class Faker {
  abstract num(options?: { min?: number; max?: number }): number;
  abstract name(): string;
  abstract uuid(): string;
  abstract email(): string;
  abstract paragraph(max: number): string;
  abstract password(): string;
}
