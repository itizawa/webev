import { User } from '@monorepo/webev-client/src/domains/User';
import { IUserRepository } from '@monorepo/webev-client/src/application/repositories';

/**
 * email をもとにuserを検索する
 * @param {string} email
 * @returns {User} user
 */
export class FindByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute({ email }: { email: string }): Promise<User | null> {
    return this.userRepository.findOne({ email });
  }
}
