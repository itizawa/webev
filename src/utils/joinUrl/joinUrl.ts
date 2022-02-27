/**
 * queryを結合して返すutil
 * @param path url
 * @param params string[]
 */
export const joinUrl = (path: string, params: string[]) => {
  return `${path}?${params.join('&')}`;
};
