import { FC } from 'react';
import styled from 'styled-components';

import { Footer } from '../Footer';

import { Navbar } from '~/components/common/Navbar';

import { BootstrapBreakpoints } from '~/interfaces/variables';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <div>
      <div className="bg-dark">
        <Navbar />
      </div>
      <StyledBorder />
      <div className="webev-container container">{children}</div>
      <Footer />
    </div>
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
