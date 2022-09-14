import { User } from "../User.model";

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;
}
