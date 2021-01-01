import { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SidebarList } from '.';

export default {
  title: 'organisms/SidebarList',
  component: SidebarList,
};

export const _default: Story<ComponentProps<typeof SidebarList>> = () => {
  return (
    <>
      <h4>List Item With Icon</h4>
      <SidebarList />
    </>
  );
};
