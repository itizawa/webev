import Head from 'next/head';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';

import '~/styles/global.scss';

import { usePageListSWR } from '~/stores/page';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }: AppProps) => {
  const [socket] = useState(() => io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'));
  const { mutate: pageListMutate } = usePageListSWR();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected!!');
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected!!');
    });
    socket.on('update-page', () => {
      console.log('Get Updated Data');
      pageListMutate();
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Provider options={{ clientMaxAge: 0, keepAlive: 0 }} session={pageProps.session}>
      <Head>
        <title>Webev</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
