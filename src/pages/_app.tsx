import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }: AppProps) => (
  <React.Fragment>
    <Head>
      <title>My page</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <Component {...pageProps} />
  </React.Fragment>
);

export default App;
