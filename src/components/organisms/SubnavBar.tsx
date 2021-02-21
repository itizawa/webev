import Link from 'next/link';
import { FC } from 'react';
import { Icon } from '../icons/Icon';
import { navbarItemMappings } from '~/const/navbarItemMappings';

export const SubnavBar: FC = () => {
  return (
    <>
      {navbarItemMappings.map((v) => {
        return (
          <Link key={v.text} href={v.url}>
            <span className="text-center">
              {v.icon != null && <Icon icon={v.icon} />}
              <span className="ms-1">{v.text}</span>
            </span>
          </Link>
        );
      })}
    </>
  );
};
