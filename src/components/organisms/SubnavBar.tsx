import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ClassNames from 'classnames';
import { BootstrapColor } from '~/interfaces/variables';

import { Icon } from '~/components/Icons/Icon';
import styles from '~/styles/components/organisms/SubnavBar.module.scss';
import { navbarItemMappings } from '~/const/navbarItemMappings';

export const SubnavBar: FC = () => {
  const router = useRouter();

  return (
    <div className={`sticky-top bg-dark d-flex justify-content-evenly d-md-none ${styles.subnavbar}`}>
      {navbarItemMappings.map((v) => {
        const classNameForListItem = ClassNames({
          ['text-center col py-2']: true,
          [styles.active]: v.url === router.pathname,
        });

        return (
          <Link key={v.text} href={v.url}>
            <div className={classNameForListItem}>
              {v.icon != null && <Icon icon={v.icon} color={BootstrapColor.SECONDARY} />}
              <span className="ms-1">{v.text}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
