import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { Provider } from 'next-auth/client';
import { NextUIProvider } from '@nextui-org/react';
import { SkeletonTheme } from 'react-loading-skeleton';

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
  usePageView();

  if (isMaintenanceMode) {
    return <MaintenanceLayout />;
  }

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <NextUIProvider>
      <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
        <SkeletonTheme color="#213243" highlightColor="#444">
          {getLayout(<Component {...pageProps} />)}
        </SkeletonTheme>
      </Provider>
    </NextUIProvider>
  );
};

export default App;
