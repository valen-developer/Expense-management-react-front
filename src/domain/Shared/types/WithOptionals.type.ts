/**
 * Type that makes properties optionals
 *
 * @param T type to make properties optionals
 * @param K properties to make optionals (separator: "|")
 */
export type WithOptionals<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
