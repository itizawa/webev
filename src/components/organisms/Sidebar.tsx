import { FC, useState } from 'react';
import ClassNames from 'classnames';

import { HomeIcon } from '~/components/icons/HomeIcon';
import { StarIcon } from '~/components/icons/StarIcon';

import styles from '~/styles/components/organisms/Sidebar.module.scss';

const sidebarItemMappings = [
  { text: 'Home', url: '/home', icon: <HomeIcon /> },
  { text: 'Favorite', url: '/favorites', icon: <StarIcon isActive /> },
];

export const Sidebar: FC = () => {
  const [url, setUrl] = useState('/home' as string);

  return (
    <ul className="sidebar-list-group list-group gap-3 py-3 text-white">
      {sidebarItemMappings.map((v) => {
        const classNameForListItem = ClassNames({
          [`${styles['sidebar-list-group-item']} list-group-item mx-3 border-0`]: true,
          [styles.active]: v.url === url,
        });

        return (
          <li key={v.text} className={classNameForListItem} onClick={() => setUrl(v.url)}>
            {v.icon != null && v.icon}
            <span className="ms-3">{v.text}</span>
          </li>
        );
      })}
    </ul>
  );
};
