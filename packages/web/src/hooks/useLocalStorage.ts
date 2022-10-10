import { useCallback } from 'react';

/**
 * ローカルストレージを使うための hooks
 */
export const useLocalStorage = (): {
  storeValue: <T>(key: string, value?: T) => void;
  retrieveValue: <T>(key: string) => T | null;
} => {
  const storeValue = useCallback(<T>(key: string, value?: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const retrieveValue = useCallback(<T>(key: string): T | null => {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    return JSON.parse(value);
  }, []);

  return { storeValue, retrieveValue };
};
