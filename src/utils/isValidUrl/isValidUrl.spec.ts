import { isValidUrl } from './isValidUrl';

describe('isValidUrl', (): void => {
  test('string', (): void => {
    const response = isValidUrl('hoge');
    expect(response).toBeFalsy();
  });

  test('invalid', (): void => {
    const response = isValidUrl('example.com');
    expect(response).toBeFalsy();
  });

  test('empty string', (): void => {
    const response = isValidUrl('');
    expect(response).toBeFalsy();
  });

  test('https', (): void => {
    const response = isValidUrl('https://example.com');
    expect(response).toBeTruthy();
  });

  test('http', (): void => {
    const response = isValidUrl('http://example.com');
    expect(response).toBeTruthy();
  });

  test('with slash', (): void => {
    const response = isValidUrl('https://example.com/');
    expect(response).toBeTruthy();
  });
});
