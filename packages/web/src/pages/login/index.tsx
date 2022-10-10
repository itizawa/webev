import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

import { Grid } from '@nextui-org/react';

import { WebevNextPage } from '@webev/web/libs/interfaces/webevNextPage';

import { toastSuccess } from '@webev/web/utils/toastr';

import { WebevOgpHead } from '@webev/web/components/common/WebevOgpHead';
import { DefaultLayout } from '@webev/web/components/common/Layout/DefaultLayout';
import { LoginCard } from '@webev/web/components/uiParts';

const Page: WebevNextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.isRedirect) {
      toastSuccess('ログインが必要です');
    }
  }, [router.query.isRedirect]);

  return (
    <>
      <WebevOgpHead title="Webev | Login" />
      <Grid>
        <Grid css={{ mw: '400px', mx: 'auto' }}>
          <LoginCard />
        </Grid>
      </Grid>
    </>
  );
};

const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;
