import { useCallback, useState } from 'react';

/**
 * クリップボードへテキストをコピーするためのhooks
 * @returns hasCopied クリップボードへのコピーが完了したかどうか
 * @returns handleCopy クリップボードへのコピーを行うための関数
 */
export const useClipboard = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
  }, []);

  return { hasCopied, handleCopy };
};
