import Head from 'next/head';
import { FC } from 'react';
import { useSession } from 'next-auth/client';
import styled from 'styled-components';

import { Footer } from '../organisms/Footer';
import { SocketConnector } from '~/components/SocketConnector';

import { Navbar } from '~/components/organisms/Navbar';
import { PageModals } from '~/components/PageModals/PageModals';

import { BootstrapBreakpoints } from '~/interfaces/variables';

export const DefaultLayout: FC = ({ children }) => {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>Webev</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <Navbar />
      <StyledBorder />
      <StyledDiv className="container">{children}</StyledDiv>
      {session && <PageModals />}
      {session && <SocketConnector />}
      <Footer />
    </>
  );
};

const StyledDiv = styled.div`
  /* 画面全体からNavbarとFooterの高さを引く */
  min-height: calc(100vh - 100px - 100px);
`;

const StyledBorder = styled.div`
  height: 4px;
  background: linear-gradient(90deg, #f6d02e 0, #f87c00 47%, #f6d02e);
  @media (min-width: ${BootstrapBreakpoints.md}px) {
    position: sticky;
    top: 0;
    z-index: 980;
  }
`;
