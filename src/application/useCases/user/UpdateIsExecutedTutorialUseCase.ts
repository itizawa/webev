import { User } from '~/domains/User';
import { IUserRepository } from '~/application/repositories';

/**
 * isExecutedTutorialを更新する
 * @param {User["id"]} userId
 * @returns {User} user
 */
export class UpdateIsExecutedTutorialUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute({ userId }: { userId: string }): Promise<User | null> {
    return this.userRepository.update(userId, {});
  }
}
