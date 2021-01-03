import { ComponentProps, useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { OgpCard } from '~src/components/organisms/OgpCard';

export default {
  title: 'organisms/OgpCard',
  component: OgpCard,
};

export const _default: Story<ComponentProps<typeof OgpCard>> = () => {
  return (
    <>
      <h4>
        <a href="https://qiita.com/itizawa">https://qiita.com/itizawa</a>
      </h4>
      <OgpCard />
    </>
  );
};
