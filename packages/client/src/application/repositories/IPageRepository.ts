import { FilterQuery } from 'mongoose';

import { Page } from '@monorepo/webev-client/src/domains/Page';
import { PaginationOptions } from '@monorepo/webev-client/src/libs/interfaces/pagination';
import { PaginationResult } from '@monorepo/webev-client/src/libs/interfaces/paginationResult';

export interface IPageRepository {
  create(pages: Partial<Page>): Promise<Page>;
  count(): Promise<number>;
  find(query: FilterQuery<Page>, options: PaginationOptions): Promise<PaginationResult<Page>>;
  findById(id: Page['_id']): Promise<Page | null>;
  update(id: string, newObject: Partial<Page>): Promise<Page | null>;
}
