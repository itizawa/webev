import { VFC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { appWithTranslation } from 'next-i18next';

import '~/styles/global.scss';

const App: VFC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default appWithTranslation(App);
