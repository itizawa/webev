import { User } from '@monorepo/client/src/domains/User';
import { IUserRepository } from '@monorepo/client/src/application/repositories';

/**
 * isExecutedTutorialを更新する
 * @param {User["_id"]} userId
 * @returns {User} user
 */
export class UpdateIsExecutedTutorialUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute({ userId }: { userId: string }): Promise<User | null> {
    return this.userRepository.update(userId, { isExecutedTutorial: true });
  }
}
