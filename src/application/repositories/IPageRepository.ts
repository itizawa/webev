import { Page } from '~/domains/Page';

export interface IPageRepository {
  create(pages: Partial<Page>): Promise<Page>;
}
