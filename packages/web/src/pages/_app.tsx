import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

import { theme } from '@webev/web/styles/theme';
import '@webev/web/styles/global.scss';

import { MaintenanceLayout } from '@webev/web/components/common/Layout/MaintenanceLayout';

import { usePageView } from '@webev/web/hooks/usePageView';
import { WebevNextPage } from '@webev/web/libs/interfaces/webevNextPage';
import { ModalProvider } from '@webev/web/components/providers/ModalProvider';
import { PagePaginationProvider } from '@webev/web/components/providers/PagePaginationProvider';

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
