import { FC, useState, ReactNode } from 'react';
import ClassNames from 'classnames';

import { HomeIcon } from '~/components/icons/HomeIcon';
import { StarIcon } from '~/components/icons/StarIcon';

import styles from '~/styles/components/organisms/Sidebar.module.scss';

const sidebarItemMappings = [
  { text: 'Home', url: '/home', icon: <HomeIcon /> },
  { text: 'Favorite', url: '/favorites', icon: <StarIcon /> },
];

export const Sidebar: FC = () => {
  const [url, setUrl] = useState('/home' as string);

  return (
    <div className={`h-100 ${styles.sidebar}`}>
      <ul className="sidebar-list-group list-group gap-3 py-3 text-white">
        {sidebarItemMappings.map((v) => {
          const classNameForListItem = ClassNames({
            'sidebar-list-group-item list-group-item mx-3 border-0': true,
            active: v.url === url,
          });

          return (
            <li key={v.text} className={classNameForListItem} onClick={() => setUrl(v.url)}>
              <SidebarListItem icon={v.icon} text={v.text} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

type SidebarListItemProps = {
  icon?: ReactNode;
  text: string;
};

const SidebarListItem: FC<SidebarListItemProps> = (props: SidebarListItemProps) => {
  const { icon, text } = props;

  return (
    <span>
      {icon != null && icon}
      <span className="ms-3">{text}</span>
    </span>
  );
};
