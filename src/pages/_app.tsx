import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import '~/styles/global.scss';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
