import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { VFC } from 'react';
import { Provider } from 'next-auth/client';

import '~/styles/global.scss';

import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { PathNames, PathConfigs, LayoutNames } from '~/interfaces/route';
import { DefaultLayout } from '~/components/Layout/DefaultLayout';

const App: VFC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pathname = router.pathname as PathNames;

  if (PathConfigs[pathname].layout === LayoutNames.DASHBOARD) {
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
