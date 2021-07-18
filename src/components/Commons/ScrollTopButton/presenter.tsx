import { VFC } from 'react';

import { StyledButton } from './style';
import { Icon } from '~/components/base/atoms/Icon';

export type ViewProps = {
  scrollTop: () => void;
  showScroll: boolean;
};

export const Presenter: VFC<ViewProps> = ({ scrollTop, showScroll }) => {
  return (
    <StyledButton id="scroll-to-top" onClick={scrollTop} className={`btn btn-light btn-lg ${showScroll ? 'show' : ''}`}>
      <Icon icon="ARROW" color="SECONDARY" />
    </StyledButton>
  );
};
