import { FC } from 'react';

import { Button } from '@nextui-org/react';
import { useHooks } from './hooks';
import { Icon } from '@webev/web/components/base/atoms/Icon';

export const ScrollTopButton: FC = () => {
  const { scrollTop, isShowScroll } = useHooks();

  return (
    <Button
      onClick={scrollTop}
      css={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        transition: 'opacity 0.4s',
        transitionDuration: '200ms',
        transitionProperty: 'all',
        opacity: 0.5,
        '&:hover': {
          opacity: 0.9,
        },
        width: '40px',
        backgroundColor: '$cyan100',
        display: isShowScroll ? 'block' : 'none',
      }}
      auto
    >
      <Icon icon="ARROW" />
    </Button>
  );
};
