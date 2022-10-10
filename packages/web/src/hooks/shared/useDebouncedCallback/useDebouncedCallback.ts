import { useRef, useEffect } from 'react';

/**
 * 特定の秒数間後に1度だけ実行するhooks
 * @param callback 待機後に実行するコールバック関数
 * @param wait 何秒待機するか
 * @see https://stackoverflow.com/a/57335271
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebouncedCallback = <A extends any[]>(callback: (...args: A) => void, wait: number) => {
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  useEffect(() => cleanup, []);

  return function debouncedCallback(...args: A) {
    argsRef.current = args;
    cleanup();

    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, wait);
  };
};
