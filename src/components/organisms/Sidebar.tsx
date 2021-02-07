import { FC, useState } from 'react';
import { SidebarList } from '~/components/organisms/SidebarList';

type Props = {};

export const Sidebar: FC<Props> = (props: Props) => {
  const [url, setUrl] = useState('/home' as string);

  return (
    <div className="sidebar h-100">
      <SidebarList url={url} onClickSidebarListItem={(url) => setUrl(url)} />
    </div>
  );
};
