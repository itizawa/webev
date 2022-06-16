import { ComponentProps, FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Grid } from '@nextui-org/react';
import { useLocale } from '~/hooks/useLocale';

import { Icon } from '~/components/base/atoms/Icon';
import { URLS } from '~/libs/constants/urls';

export const FooterSubnavBar: FC = () => {
  const router = useRouter();
  const { t } = useLocale();

  const navbarItemMappings: Array<{ text: string; url: string; icon: ComponentProps<typeof Icon>['icon'] }> = [
    { text: t.home, url: URLS.HOME_URL, icon: 'HOME' },
    { text: t.my_page, url: URLS.ME, icon: 'PERSON' },
    // { text: t.directory, url: '/directory', icon: 'DIRECTORY' },
  ];

  return (
    <Grid
      css={{
        display: 'flex',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        justifyContent: 'space-evenly',
        bgColor: '$gray100',
        border: 0,
        borderTop: 3,
        borderStyle: 'solid',
        borderColor: '$gray400',
        zIndex: '$10',
      }}
    >
      {navbarItemMappings.map((v) => {
        const isActive = router.pathname.startsWith(v.url);
        return (
          <Link key={v.text} href={v.url}>
            <a>
              <Grid
                css={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  py: '$4',
                  alignItems: 'center',
                  color: isActive ? 'white' : '$accents7',
                }}
                className="text-center col d-flex flex-column bg-dark border-top border-secondary"
              >
                <Icon icon={v.icon} />
                {v.text}
              </Grid>
            </a>
          </Link>
        );
      })}
    </Grid>
  );
};
