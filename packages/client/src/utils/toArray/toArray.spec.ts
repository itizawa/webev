import { toArray } from './toArray';

describe('toArray', (): void => {
  test('only one string', (): void => {
    const response = toArray('hoge');
    expect(response).toEqual(['hoge']);
  });

  test('pass string array', (): void => {
    const response = toArray(['hoge', 'huga']);
    expect(response).toEqual(['hoge', 'huga']);
  });

  test('only one number', (): void => {
    const response = toArray(1);
    expect(response).toEqual([1]);
  });

  test('only number array', (): void => {
    const response = toArray([1, 2]);
    expect(response).toEqual([1, 2]);
  });

  test('pass null', (): void => {
    const response = toArray(null);
    expect(response).toEqual([null]);
  });

  test('pass undefined', (): void => {
    const response = toArray(undefined);
    expect(response).toEqual([]);
  });

  test('pass object', (): void => {
    const response = toArray({ hoge: 'huga' });
    expect(response).toEqual([{ hoge: 'huga' }]);
  });
});
