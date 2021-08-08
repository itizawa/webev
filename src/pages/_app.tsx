import { ReactNode } from 'react';

import '~/styles/global.scss';

import { MaintenanceLayout } from '~/components/common/Layout/MaintenanceLayout';

import { usePageView } from '~/hooks/usePageView';
import { WebevNextPage } from '~/interfaces/webevNextPage';

const App: ({ Component, pageProps }: { Component: WebevNextPage; pageProps: { children?: ReactNode } }) => JSX.Element = ({
  Component,
  pageProps,
}: {
  Component: WebevNextPage;
  pageProps: { children?: ReactNode };
}) => {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  // GA
  usePageView();

  if (isMaintenanceMode) {
    return <MaintenanceLayout />;
  }

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />);
};

export default App;
