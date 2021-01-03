import { ComponentProps, useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { OgpCard } from '~src/components/organisms/OgpCard';

export default {
  title: 'organisms/OgpCard',
  component: OgpCard,
};

export const _default: Story<ComponentProps<typeof OgpCard>> = () => {
  const url = 'https://qiita.com/';

  return (
    <>
      <h4>
        <a href={url}>{url}</a>
      </h4>
      <OgpCard url={url} />
    </>
  );
};
