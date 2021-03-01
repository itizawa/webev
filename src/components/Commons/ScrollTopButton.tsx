import { VFC, useState, useEffect } from 'react';
import { throttle } from 'throttle-debounce';

export const ScrollTopButton: VFC = () => {
  const [showScroll, setShowScroll] = useState(false);

  const throttleCheckScrollTop = throttle(500, () => {
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

  return (
    <button id="scroll-to-top" onClick={scrollTop} className={`btn btn-light btn-lg ${showScroll ? 'd-block' : 'd-none'}`}>
      <i className="fas fa-chevron-up" />
    </button>
  );
};
