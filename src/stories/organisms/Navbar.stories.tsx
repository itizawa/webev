import { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { Navbar } from '~/components/organisms/Navbar';

export default {
  title: 'organisms/Navbar',
  component: Navbar,
};

export const _default: Story<ComponentProps<typeof Navbar>> = () => {
  return (
    <>
      <h4>List Item With Icon</h4>
      <Navbar />
    </>
  );
};
