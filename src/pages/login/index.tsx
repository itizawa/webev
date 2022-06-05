import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

import { Grid } from '@nextui-org/react';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { toastSuccess } from '~/utils/toastr';

import { LoginRequiredWrapper } from '~/components/common/Authentication/LogoutRequiredWrapper';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { DefaultLayout } from '~/components/common/Layout/DefaultLayout';
import { LoginCard } from '~/components/uiParts';

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
      <LoginRequiredWrapper>
        <Grid>
          <Grid css={{ mw: '400px', mx: 'auto' }}>
            <LoginCard />
          </Grid>
        </Grid>
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

Page.getLayout = getLayout;
export default Page;
