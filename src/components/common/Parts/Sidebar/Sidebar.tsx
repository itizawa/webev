import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Grid } from '@nextui-org/react';
import { useLocale } from '~/hooks/useLocale';

import { BootstrapIcon } from '~/libs/interfaces/variables';
import { Icon } from '~/components/base/atoms/Icon';

export const Sidebar: FC = () => {
  const router = useRouter();
  const { t } = useLocale();

  const navbarItemMappings: Array<{ text: string; url: string; icon: BootstrapIcon }> = [
    { text: t.home, url: '/home', icon: 'HOME' },
    { text: t.read, url: '/archived', icon: 'CHECK' },
    // { text: t.directory, url: '/directory', icon: 'DIRECTORY' },
  ];

  return (
    <Grid
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: '$8',
        position: 'sticky',
        top: '$8',
      }}
    >
      {navbarItemMappings.map((v) => {
        return (
          <Link key={v.text} href={v.url}>
            <Button
              color="secondary"
              css={{ gap: '$2', fontWeight: '$bold' }}
              icon={v.icon != null ? <Icon icon={v.icon} /> : undefined}
              ghost={!router.pathname.startsWith(v.url)}
            >
              {v.text}
            </Button>
          </Link>
        );
      })}
      {/* <SidebarDirectoryList /> */}
    </Grid>
  );
};
