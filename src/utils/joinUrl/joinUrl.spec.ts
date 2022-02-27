import { joinUrl } from './joinUrl';

describe('joinUrl', (): void => {
  test('単数', (): void => {
    const response = joinUrl('/', ['hoge=hoge']);
    expect(response).toBe('/?hoge=hoge');
  });

  test('複数', (): void => {
    const response = joinUrl('/page', ['hoge=hoge', 'piyo=piyo']);
    expect(response).toBe('/page?hoge=hoge&piyo=piyo');
  });
});
