import { IPageRepository } from '@monorepo/client/src/application/repositories/IPageRepository';
import { Page } from '@monorepo/client/src/domains/Page';
import { OgpAdapter } from '@monorepo/client/src/infrastructure/adapters/ogpAdapter';

const ogpAdapter = new OgpAdapter();
/**
 * url をもとに page を複数生成する
 * @param {string} url
 * @param {string} userId
 */
export class PostPageByUrlUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute({ url, userId }: { url: string; userId: string }): Promise<Page> {
    const ogp = await ogpAdapter.fetch(url);

    return this.pageRepository.create({ ...ogp, createdUser: userId });
  }
}
