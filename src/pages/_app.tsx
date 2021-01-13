import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '~src/styles/global.scss';
import { Navbar } from '~src/components/organisms/Navbar';
import { Sidebar } from '~src/components/organisms/Sidebar';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const App = ({ Component, pageProps }: AppProps) => (
  <React.Fragment>
    <Head>
      <title>My page</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
    </Head>
    <Navbar />
    <div className="row">
      <div className="col-3 d-none d-lg-block">
        <Sidebar />
      </div>
      <div className="col col-lg-9">
        <Component {...pageProps} />
      </div>
    </div>
  </React.Fragment>
);

export default App;
