import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

import { theme } from '~/styles/theme';
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
  pageProps: { children?: ReactNode };
}) => {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  usePageView();

  if (isMaintenanceMode) {
    return <MaintenanceLayout />;
  }

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <NextUIProvider theme={theme}>
      <PagePaginationProvider>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ModalProvider>{getLayout(<Component {...(pageProps as any)} />)}</ModalProvider>
      </PagePaginationProvider>
    </NextUIProvider>
  );
};

export default App;
