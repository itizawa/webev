import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { VFC } from 'react';
import { Provider } from 'next-auth/client';

import '~/styles/global.scss';

import { MaintenanceLayout } from '~/components/common/Layout/MaintenanceLayout';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { PathNames, PathConfigs, LayoutNames } from '~/interfaces/route';
import { DefaultLayout } from '~/components/common/Layout/DefaultLayout';

import { usePageView } from '~/hooks/usePageView';

const App: VFC<AppProps> = ({ Component, pageProps }) => {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  const router = useRouter();
  const pathname = router.pathname as PathNames;

  // GA
  usePageView();

  if (PathConfigs[pathname]?.layout === LayoutNames.DASHBOARD) {
    if (isMaintenanceMode) {
      return <MaintenanceLayout />;
    }
    return (
      <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
        <DashBoardLayout>
          <Component {...pageProps} />
        </DashBoardLayout>
      </Provider>
    );
  }

  return (
    <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Provider>
  );
};

export default App;
