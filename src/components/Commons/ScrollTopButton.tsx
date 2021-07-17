import { VFC, useState, useEffect } from 'react';
import { throttle } from 'throttle-debounce';
import style from 'styled-components';

import { Icon } from '~/components/Icons/Icon';

export const ScrollTopButton: VFC = () => {
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

  return (
    <StyledButton id="scroll-to-top" onClick={scrollTop} className={`btn btn-light btn-lg ${showScroll ? 'show' : ''}`}>
      <Icon icon="ARROW" color="SECONDARY" />
    </StyledButton>
  );
};

const StyledButton = style.button`
  position: fixed;
  right: 20px;
  bottom: 20px;
  opacity: 0;
  transition: opacity 0.4s; 
  transition-duration: 200ms;
  transition-property: all;

  &.show{
    opacity: 0.5;
    &:hover{
      opacity: 0.7;
    }
  }
`;
