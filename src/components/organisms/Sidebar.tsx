import { FC, useState } from 'react';
import Link from 'next/link';
import ClassNames from 'classnames';

import { Icon } from '../icons/Icon';
import styles from '~/styles/components/organisms/Sidebar.module.scss';
import { BootstrapIcon } from '~/interfaces/variables';

const sidebarItemMappings = [
  { text: 'Home', url: '/home', icon: BootstrapIcon.HOME },
  { text: 'Favorite', url: '/favorites', icon: BootstrapIcon.STAR },
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
          <Link key={v.text} href={v.url}>
            <li className={classNameForListItem} onClick={() => setUrl(v.url)}>
              {v.icon != null && <Icon icon={v.icon} />}
              <span className="ms-3">{v.text}</span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
