import { useState, useEffect, useMemo, useRef } from 'react';
import { throttle } from 'throttle-debounce';

const usePrevious = (value: number): number => {
  const ref = useRef(0);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useHooks = (): { isShowScroll: boolean } => {
  const [currentYOffset, setCurrentYOffset] = useState(0);
  const prevYOffset = usePrevious(currentYOffset);

  const isShowScroll = useMemo(() => {
    // 特定の高さかつ上方向にスクロールしたときに表示
    return currentYOffset > 500 && currentYOffset < prevYOffset;
  }, [currentYOffset, prevYOffset]);

  const throttleCheckScrollTop = throttle(300, () => {
    const currentYOffset = window.pageYOffset;
    setCurrentYOffset(currentYOffset);
  });

  useEffect(() => {
    window.addEventListener('scroll', throttleCheckScrollTop);
    return () => {
      window.removeEventListener('scroll', throttleCheckScrollTop);
    };
  }, []);

  return {
    isShowScroll,
  };
};
