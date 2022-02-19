import { Page } from '~/domains/Page';

export interface IPageRepository {
  createPages({ pages }: { pages: Page[] }): Promise<Page[]>;
}
