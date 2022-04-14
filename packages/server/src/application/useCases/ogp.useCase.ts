import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IOgpAdapter } from 'src/application/adapters/IOgpAdapter';

@Injectable()
export class OgpUseCase {
  constructor(private readonly ogpAdapter: IOgpAdapter) {}
  /**
   * Ogp を取得する
   * @param url {string} 対象のurl
   */
  async fetchOgp(url: string): Promise<{ [key: string]: string }> {
    try {
      return await this.ogpAdapter.fetch(url);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'OGPを取得できませんでした',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
