import { ReactNode, useEffect } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { SkeletonTheme } from 'react-loading-skeleton';

import '~/styles/global.scss';

import { useRouter } from 'next/router';
import { MaintenanceLayout } from '~/components/common/Layout/MaintenanceLayout';

import { usePageView } from '~/hooks/usePageView';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { useSearchKeyWord } from '~/stores/page';
import { ModalProvider } from '~/components/providers/ModalProvider';
import { PagePaginationProvider } from '~/components/providers/PagePaginationProvider';

const App: ({ Component, pageProps }: { Component: WebevNextPage; pageProps: { children?: ReactNode } }) => JSX.Element = ({
  Component,
  pageProps,
}: {
  Component: WebevNextPage;
  pageProps: { children?: ReactNode; session?: Session };
}) => {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  const router = useRouter();
  const { mutate: mutateSearchKeyword } = useSearchKeyWord();
  usePageView();

  useEffect(() => {
    mutateSearchKeyword('');
  }, [router.asPath, mutateSearchKeyword]);

  if (isMaintenanceMode) {
    return <MaintenanceLayout />;
  }

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <SkeletonTheme baseColor="#213243" highlightColor="#444">
        <ModalProvider>
          <PagePaginationProvider>{getLayout(<Component {...pageProps} />)}</PagePaginationProvider>
        </ModalProvider>
      </SkeletonTheme>
    </SessionProvider>
  );
};

export default App;
