import Head from 'next/head';
import { FC } from 'react';
import { useSession } from 'next-auth/client';
import styled from 'styled-components';

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
      <div className="container">{children}</div>
      {session && <PageModals />}
      {session && <SocketConnector />}
    </>
  );
};

const StyledBorder = styled.div`
  height: 4px;
  background: linear-gradient(90deg, #f6d02e 0, #f87c00 47%, #f6d02e);
  @media (min-width: ${BootstrapBreakpoints.md}px) {
    position: sticky;
    top: 0;
    z-index: 980;
  }
`;
