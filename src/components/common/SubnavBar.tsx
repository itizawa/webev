import { VFC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { BootstrapIcon } from '~/interfaces/variables';
import { useLocale } from '~/hooks/useLocale';

import { Icon } from '~/components/base/atoms/Icon';

export const SubnavBar: VFC = () => {
  const router = useRouter();
  const { t } = useLocale();

  const navbarItemMappings: Array<{ text: string; url: string; icon: BootstrapIcon }> = [
    { text: t.home, url: '/home', icon: 'HOME' },
    { text: t.read, url: '/read', icon: 'CHECK' },
    { text: t.directory, url: '/directory', icon: 'DIRECTORY' },
  ];

  return (
    <div className="fixed-bottom bg-dark d-flex justify-content-evenly d-md-none">
      {navbarItemMappings.map((v) => {
        const isActive = router.pathname.startsWith(v.url);
        return (
          <Link key={v.text} href={v.url}>
            <div className="text-center col d-flex flex-column bg-dark border-top pt-2 border-secondary">
              <small className="ms-1 text-nowrap">{v.icon != null && <Icon icon={v.icon} color={isActive ? 'WHITE' : 'SECONDARY'} />}</small>
              <span className={`ms-2 ${isActive ? 'text-white' : 'text-secondary'}`}>{v.text}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
