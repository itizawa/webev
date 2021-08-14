// simple validation
// https://dev.to/calvinpak/simple-url-validation-with-javascript-4oj5
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
  } catch (e) {
    return false;
  }
  return true;
};
