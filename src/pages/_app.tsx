import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '~/styles/global.scss';
import { Navbar } from '~/components/organisms/Navbar';
import { Sidebar } from '~/components/organisms/Sidebar';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }: AppProps) => (
  <React.Fragment>
    <Head>
      <title>My page</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <Navbar />
    <div className="d-flex">
      <div className="d-none d-lg-block">
        <Sidebar />
      </div>
      <div className="p-5">
        <Component {...pageProps} />
      </div>
    </div>
  </React.Fragment>
);

export default App;
