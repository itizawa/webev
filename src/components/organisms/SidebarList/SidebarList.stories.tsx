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
      <SidebarList url="/home" onClickSidebarListItem={(url) => console.log(url)} />

      <h4>List Item With Icon</h4>
      <SidebarList url="/favorites" onClickSidebarListItem={(url) => console.log(url)} />
    </>
  );
};
