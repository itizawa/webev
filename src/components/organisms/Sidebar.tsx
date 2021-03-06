import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ClassNames from 'classnames';

import { BootstrapColor } from '~/interfaces/variables';

import { Icon } from '~/components/Icons/Icon';
import styles from '~/styles/components/organisms/Sidebar.module.scss';
import { navbarItemMappings } from '~/const/navbarItemMappings';

export const Sidebar: FC = () => {
  const router = useRouter();

  return (
    <ul className="sidebar-list-group list-group gap-3 py-3 text-white sticky-top">
      {navbarItemMappings.map((v) => {
        const classNameForListItem = ClassNames({
          [`${styles['sidebar-list-group-item']} list-group-item mx-3 border-0`]: true,
          [styles.active]: v.url === router.pathname,
        });

        return (
          <Link key={v.text} href={v.url}>
            <li className={classNameForListItem}>
              {v.icon != null && <Icon icon={v.icon} color={BootstrapColor.LIGHT} />}
              <span className="ms-3 d-none d-lg-inline-block">{v.text}</span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
