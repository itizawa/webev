import { HttpException, HttpStatus } from '@nestjs/common';
import { IOgpAdapter } from 'src/application/adapters/IOgpAdapter';
import { OgpAdapter } from 'src/infrastructure/adapters/ogp.adapter';
import { FetchOgpUseCase } from './fetchOgp.useCase';

const url = 'http://example.com';

describe('OgpUseCase Test', () => {
  let ogpAdapter: IOgpAdapter;
  let ogpUseCase: FetchOgpUseCase;

  beforeEach(async () => {
    ogpAdapter = new OgpAdapter();
    ogpUseCase = new FetchOgpUseCase(ogpAdapter);
  });

  describe('成功', () => {
    it('正常にデータが取得できる', async () => {
      jest
        .spyOn(ogpAdapter, 'fetch')
        .mockImplementation(async (url: string) => {
          return { url, title: 'example' };
        });

      const result = await ogpUseCase.fetchOgp(url);

      expect(result).toEqual({ url, title: 'example' });
    });
  });
  describe('失敗', () => {
    it('OGPを取得できない', async () => {
      jest.spyOn(ogpAdapter, 'fetch').mockImplementation(async () => {
        throw new Error('fail to request');
      });

      try {
        await ogpUseCase.fetchOgp(url);
      } catch (e) {
        expect(e).toEqual(
          new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'OGPを取得できませんでした',
            },
            HttpStatus.BAD_REQUEST,
          ),
        );
      }
    });
  });
});
