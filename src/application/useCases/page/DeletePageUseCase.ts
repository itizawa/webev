import { IPageRepository } from '~/application/repositories/IPageRepository';
import { Page, PageStatus } from '~/domains/Page';

/**
 * pageを削除する
 * @param {string} id
 * @param {string} userId
 */
export class DeletePageUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute({ id, userId }: { id: string; userId: string }): Promise<Page | null> {
    const page = await this.pageRepository.findById(id);

    if (!page) {
      throw new Error('ページが見つかりませんでした');
    }

    if (page.createdUser !== userId) {
      throw new Error('ページを削除できるのは作成者だけです');
    }

    return this.pageRepository.update(id, { status: PageStatus.PAGE_STATUS_DELETED });
  }
}
