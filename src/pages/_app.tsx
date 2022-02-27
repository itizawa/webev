import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { SkeletonTheme } from 'react-loading-skeleton';

import '~/styles/global.scss';

import { MaintenanceLayout } from '~/components/common/Layout/MaintenanceLayout';

import { usePageView } from '~/hooks/usePageView';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
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
  usePageView();

  if (isMaintenanceMode) {
    return <MaintenanceLayout />;
  }

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <SkeletonTheme baseColor="#213243" highlightColor="#444">
        <PagePaginationProvider>
          <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
        </PagePaginationProvider>
      </SkeletonTheme>
    </SessionProvider>
  );
};

export default App;
