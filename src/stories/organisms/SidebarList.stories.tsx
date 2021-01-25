import { ComponentProps, useState } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SidebarList } from '~/components/organisms/SidebarList';

export default {
  title: 'organisms/SidebarList',
  component: SidebarList,
};

export const _default: Story<ComponentProps<typeof SidebarList>> = () => {
  const [url, setUrl] = useState('/home');

  return (
    <>
      <h4>List Item With Icon</h4>
      <SidebarList url={url} onClickSidebarListItem={(url) => setUrl(url)} />
    </>
  );
};
