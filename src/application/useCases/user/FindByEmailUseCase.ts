import { User } from '~/domains/User';
import { IUserRepository } from '~/application/repositories';

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
