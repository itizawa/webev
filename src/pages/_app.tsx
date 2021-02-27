import Head from 'next/head';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { AppProps } from 'next/app';

import '~/styles/global.scss';

import style from '~/styles/navbarBorder.module.scss';
import { Navbar } from '~/components/organisms/Navbar';
import { Sidebar } from '~/components/organisms/Sidebar';
import { SubnavBar } from '~/components/organisms/SubnavBar';
import { PageModals } from '~/components/PageModals/PageModals';
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
    <>
      <Head>
        <title>Webev</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Navbar />
      <div className={`webev-nav-border ${style['nav-border']}`} />
      <nav className="sticky-top bg-dark d-flex justify-content-evenly d-md-none">
        <SubnavBar />
      </nav>
      <main className="d-flex mx-auto pt-lg-4">
        <div className="d-none d-md-block col-lg-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Component {...pageProps} />
        </div>
        <PageModals />
      </main>
    </>
  );
};

export default App;
