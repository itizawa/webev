import { IPageRepository } from '../../repositories/IPageRepository';

/**
 * 保存されたページ件数を取得する
 */
export class CountAllPagesUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  execute(): Promise<number> {
    return this.pageRepository.count();
  }
}
