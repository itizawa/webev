import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Grid } from '@nextui-org/react';
import { useLocale } from '~/hooks/useLocale';

import { BootstrapIcon } from '~/libs/interfaces/variables';
import { Icon } from '~/components/base/atoms/Icon';
import { Text } from '~/components/uiParts';

export const Sidebar: FC = () => {
  const router = useRouter();
  const { t } = useLocale();

  const navbarItemMappings: Array<{ text: string; url: string; icon: BootstrapIcon }> = [
    { text: t.home, url: '/home', icon: 'HOME' },
    { text: t.read, url: '/archived', icon: 'CHECK' },
    // { text: t.directory, url: '/directory', icon: 'DIRECTORY' },
  ];

  return (
    <Grid className="sticky-top" css={{ display: 'flex', flexDirection: 'column', gap: '$8' }}>
      {navbarItemMappings.map((v) => {
        return (
          <Link key={v.text} href={v.url}>
            <Button color="secondary" css={{ gap: '$2' }} ghost={!router.pathname.startsWith(v.url)}>
              <Text css={{ alignItems: 'center', display: 'flex', gap: '$4' }}>
                {v.icon != null && <Icon icon={v.icon} />}
                {v.text}
              </Text>
            </Button>
          </Link>
        );
      })}
      {/* <SidebarDirectoryList /> */}
    </Grid>
  );
};
