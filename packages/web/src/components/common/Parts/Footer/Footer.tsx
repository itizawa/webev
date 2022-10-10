import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { FC } from 'react';

import { Container, Grid, Text } from '@nextui-org/react';
import { URLS, TERM_URL } from '~/libs/constants/urls';

import { Tooltip } from '~/components/uiParts/Tooltip';
import { useLocale } from '~/hooks/useLocale';
import { Link } from '~/components/uiParts';
import { Icon } from '~/components/base/atoms/Icon';

export const Footer: FC = () => {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <Grid css={{ pt: '$10', pb: '$20', bgColor: '$gray100', border: 0, borderTop: 1, borderStyle: 'solid', borderColor: '$gray400' }}>
      <Container display="flex" css={{ mx: 'auto' }}>
        <Grid xs={9} css={{ display: 'flex', flexDirection: 'column' }}>
          <Text h5>Webev</Text>
          <Link href={TERM_URL} css={{ mt: '$2', color: 'White' }}>
            {t.term}
          </Link>
          <Grid css={{ mt: '$8', display: 'flex', gridColumnGap: '$4' }}>
            <Link href={router.asPath} locale="en" css={{ color: 'White' }}>
              🇺🇸 English
            </Link>
            <Link href={router.asPath} locale="ja" css={{ color: 'White' }}>
              🇯🇵 Japanese
            </Link>
          </Grid>
        </Grid>
        <Grid xs={3} css={{ display: 'flex', justifyContent: 'end', gap: '$4' }}>
          <Grid>
            <Tooltip content="Webev is OSS">
              <NextLink href={URLS.WEBEV_GITHUB_URL}>
                <a target="_blank">
                  <Icon width={24} height={24} icon="GITHUB" />
                </a>
              </NextLink>
            </Tooltip>
          </Grid>
          <Grid>
            <Tooltip content="Contact Me">
              <NextLink href={URLS.ITIZAWA_TWITTER_URL}>
                <a target="_blank">
                  <Icon width={24} height={24} icon="TWITTER" />
                </a>
              </NextLink>
            </Tooltip>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
};
