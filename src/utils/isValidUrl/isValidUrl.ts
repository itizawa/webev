/**
 * url が正しいかを判定する simple な validation
 * @param url 判定するurl
 * @returns boolean
 * @see https://dev.to/calvinpak/simple-url-validation-with-javascript-4oj5
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};
