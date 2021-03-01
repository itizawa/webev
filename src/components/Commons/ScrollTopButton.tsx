import { VFC, useState, useEffect } from 'react';

export const ScrollTopButton: VFC = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 1000) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 1000) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, []);

  return (
    <button id="scroll-to-top" onClick={scrollTop} className="btn btn-light btn-lg">
      <i className="fas fa-chevron-up" />
    </button>
  );
};
