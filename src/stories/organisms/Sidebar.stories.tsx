import { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Sidebar } from '~/components/organisms/Sidebar';

export default {
  title: 'organisms/Sidebar',
  component: Sidebar,
};

export const _default: Story<ComponentProps<typeof Sidebar>> = () => {
  return (
    <>
      <h4>List Item With Icon</h4>
      <Sidebar />
    </>
  );
};
