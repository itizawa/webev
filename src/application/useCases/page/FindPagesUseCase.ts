import { FilterQuery } from 'mongoose';

import { Page } from '~/domains/Page';
import { IPageRepository } from '~/application/repositories';
import { PaginationOptions } from '~/libs/interfaces/pagination';
import { PaginationResult } from '~/libs/interfaces/paginationResult';

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
