import Head from 'next/head';
import { FC } from 'react';
import { useSession } from 'next-auth/client';

import { SocketConnector } from '~/components/SocketConnector';

import style from '~/styles/navbarBorder.module.scss';

import { Navbar } from '~/components/organisms/Navbar';
import { PageModals } from '~/components/PageModals/PageModals';
import { ScrollTopButton } from '~/components/Commons/ScrollTopButton';

export const DefaultLayout: FC = ({ children }) => {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Webev</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Navbar />
      <div className={`webev-nav-border ${style['nav-border']}`} />
      <div className="container">{children}</div>
      {session && <PageModals />}
      {session && <SocketConnector />}
      <ScrollTopButton />
    </>
  );
};
