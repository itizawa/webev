import { IPageRepository } from '~/application/repositories/IPageRepository';
import { Page } from '~/domains/Page';

/**
 * pageを削除する
 * @param {string} id
 * @param {string} userId
 */
export class ArchivePageUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute({ id, userId, isArchive }: { id: string; userId: string; isArchive: boolean }): Promise<Page | null> {
    const page = await this.pageRepository.findById(id);

    if (!page) {
      throw new Error('ページが見つかりませんでした');
    }

    if (page.createdUser !== userId) {
      throw new Error('ページをアーカイブできるのは作成者だけです');
    }

    return this.pageRepository.update(id, { archivedAt: isArchive ? new Date() : undefined });
  }
}
