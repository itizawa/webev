import { useState, useEffect } from 'react';
import { throttle } from 'throttle-debounce';

export const useHooks = (): { isShowScroll: boolean; scrollTop: () => void } => {
  const [isShowScroll, setIsShowScroll] = useState(false);

  const throttleCheckScrollTop = throttle(300, () => {
    const currentYOffset = window.pageYOffset;
    if (currentYOffset > 1000) {
      setIsShowScroll(true);
    }
    if (currentYOffset <= 1000) {
      setIsShowScroll(false);
    }
  });

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', throttleCheckScrollTop);
    return () => {
      window.removeEventListener('scroll', throttleCheckScrollTop);
    };
  }, [throttleCheckScrollTop]);

  return {
    isShowScroll,
    scrollTop,
  };
};
