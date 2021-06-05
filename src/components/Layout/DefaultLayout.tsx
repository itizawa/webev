import { FC } from 'react';
import styled from 'styled-components';

import { Footer } from '../organisms/Footer';

import { Navbar } from '~/components/organisms/Navbar';

import { BootstrapBreakpoints } from '~/interfaces/variables';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <div>
      <div className="bg-dark">
        <Navbar />
      </div>
      <StyledBorder />
      <StyledDiv className="container">{children}</StyledDiv>
      <Footer />
    </div>
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
