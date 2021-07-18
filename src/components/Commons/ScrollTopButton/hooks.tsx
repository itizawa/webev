import { useState, useEffect } from 'react';
import { throttle } from 'throttle-debounce';

import { ViewProps } from './presenter';

export const useHooks = (): ViewProps => {
  const [showScroll, setShowScroll] = useState(false);

  const throttleCheckScrollTop = throttle(300, () => {
    const currentYOffset = window.pageYOffset;
    if (currentYOffset > 1000) {
      setShowScroll(true);
    }
    if (currentYOffset <= 1000) {
      setShowScroll(false);
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
  }, []);

  return {
    showScroll,
    scrollTop,
  };
};
