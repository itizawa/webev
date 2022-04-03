import { FilterQuery } from 'mongoose';

import { Page } from '@monorepo/webev-client/src/domains/Page';
import { IPageRepository } from '@monorepo/webev-client/src/application/repositories';
import { PaginationOptions } from '@monorepo/webev-client/src/libs/interfaces/pagination';
import { PaginationResult } from '@monorepo/webev-client/src/libs/interfaces/paginationResult';

/**
 * ページリストを取得する
 * @returns {PaginationResult<Page>} 取得したページリスト
 */
export class FindPagesUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute(query: FilterQuery<Page>, options: PaginationOptions): Promise<PaginationResult<Page>> {
    return await this.pageRepository.find(query, options);
  }
}
