import { VFC } from 'react';
import style from 'styled-components';

import { useHooks } from './hooks';
import { Icon } from '~/components/base/atoms/Icon';

export const ScrollTopButton: VFC = () => {
  const { scrollTop, isShowScroll } = useHooks();

  return (
    <StyledButton id="scroll-to-top" onClick={scrollTop} className={`btn btn-light btn-lg ${isShowScroll ? 'show' : ''}`}>
      <Icon icon="ARROW" color="SECONDARY" />
    </StyledButton>
  );
};

export const StyledButton = style.button`
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
