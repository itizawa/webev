import { useState, useEffect } from 'react';
import { throttle } from 'throttle-debounce';

export const useHooks = (): { isShowScroll: boolean } => {
  const [isShowScroll, setIsShowScroll] = useState(false);

  const throttleCheckScrollTop = throttle(300, () => {
    const currentYOffset = window.pageYOffset;
    if (currentYOffset > 500) {
      setIsShowScroll(true);
    }
    if (currentYOffset <= 500) {
      setIsShowScroll(false);
    }
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
