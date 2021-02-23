import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ClassNames from 'classnames';

import { Icon } from '~/components/icons/Icon';
import styles from '~/styles/components/organisms/SubnavBar.module.scss';
import { navbarItemMappings } from '~/const/navbarItemMappings';

export const SubnavBar: FC = () => {
  const router = useRouter();

  return (
    <>
      {navbarItemMappings.map((v) => {
        const classNameForListItem = ClassNames({
          ['text-center col py-2']: true,
          [styles.active]: v.url === router.pathname,
        });

        return (
          <Link key={v.text} href={v.url}>
            <div className={classNameForListItem}>
              {v.icon != null && <Icon icon={v.icon} />}
              <span className="ms-1">{v.text}</span>
            </div>
          </Link>
        );
      })}
    </>
  );
};
