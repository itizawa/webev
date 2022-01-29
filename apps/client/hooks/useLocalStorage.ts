/**
 * ローカルストレージを使うための hooks
 */
export const useLocalStorage = (): {
  storeValue: <T>(key: string, value?: T) => void;
  retrieveValue: <T>(key: string) => T | null;
} => {
  const storeValue = <T>(key: string, value?: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const retrieveValue = <T>(key: string): T | null => {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  };

  return { storeValue, retrieveValue };
};
