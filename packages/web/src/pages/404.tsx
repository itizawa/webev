import Link from 'next/link';
import { ReactNode } from 'react';

import { Button, Grid, Text } from '@nextui-org/react';
import { WebevNextPage } from '@webev/web/libs/interfaces/webevNextPage';

import { useLocale } from '@webev/web/hooks/useLocale';
import { WebevOgpHead } from '@webev/web/components/common/WebevOgpHead';
import { DefaultLayout } from '@webev/web/components/common/Layout/DefaultLayout';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title="Webev | 404" />
      <Grid css={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', pt: '$10' }}>
        <Text h2>{t.this_is_the_404_page}</Text>
        <Link href="/">
          <a>
            <Button color="secondary" css={{ mt: '$10', mx: 'auto' }}>
              {t.go_to_top}
            </Button>
          </a>
        </Link>
      </Grid>
    </>
  );
};

const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;
