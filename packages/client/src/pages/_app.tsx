import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import '@monorepo/webev-client/src/styles/global.scss';

import { MaintenanceLayout } from '@monorepo/webev-client/src/components/common/Layout/MaintenanceLayout';

import { usePageView } from '@monorepo/webev-client/src/hooks/usePageView';
import { WebevNextPage } from '@monorepo/webev-client/src/libs/interfaces/webevNextPage';
import { ModalProvider } from '@monorepo/webev-client/src/components/providers/ModalProvider';
import { PagePaginationProvider } from '@monorepo/webev-client/src/components/providers/PagePaginationProvider';

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
      <PagePaginationProvider>
        <ModalProvider>{getLayout(<Component {...pageProps} />)}</ModalProvider>
      </PagePaginationProvider>
    </SessionProvider>
  );
};

export default App;
