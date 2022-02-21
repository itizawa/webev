import { User } from '~/domains/User';

export interface IUserRepository {
  findOne(pages: Partial<User>): Promise<User | null>;
}
