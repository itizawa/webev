import { FilterQuery } from 'mongoose';

import { Page } from '~/domains/Page';
import { PaginationOptions } from '~/libs/interfaces/pagination';
import { PaginationResult } from '~/libs/interfaces/paginationResult';

export interface IPageRepository {
  create(pages: Partial<Page>): Promise<Page>;
  count(): Promise<number>;
  find(query: FilterQuery<Page>, options: PaginationOptions): Promise<PaginationResult<Page>>;
}
