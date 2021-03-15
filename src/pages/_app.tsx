import { VFC } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import '~/styles/global.scss';

const App: VFC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
