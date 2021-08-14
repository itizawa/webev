import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { Provider } from 'next-auth/client';

import '~/styles/global.scss';

import { MaintenanceLayout } from '~/components/common/Layout/MaintenanceLayout';

import { usePageView } from '~/hooks/usePageView';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

const App: ({ Component, pageProps }: { Component: WebevNextPage; pageProps: { children?: ReactNode } }) => JSX.Element = ({
  Component,
  pageProps,
}: {
  Component: WebevNextPage;
  pageProps: { children?: ReactNode; session?: Session };
}) => {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  // GA
  usePageView();

  if (isMaintenanceMode) {
    return <MaintenanceLayout />;
  }

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
};

export default App;
