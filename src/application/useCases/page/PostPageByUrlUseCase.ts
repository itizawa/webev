import { IPageRepository } from '~/application/repositories/IPageRepository';
import { Page } from '~/domains/Page';

/**
 * url をもとに page を複数生成する
 * @param {string} url
 * @param {string} directoryId
 * @param {string} userId
 */
export class PostPageByUrlUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  execute({ url, directoryId, userId }: { url: string; directoryId?: string; userId: string }): Promise<Page> {
    return this.pageRepository.create({ url, directoryId, createdUser: userId });
  }
}
