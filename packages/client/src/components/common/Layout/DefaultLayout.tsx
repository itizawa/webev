import { FC } from 'react';
import styled from 'styled-components';

import { Navbar } from '@monorepo/webev-client/src/components/common/Navbar';
import { Footer } from '@monorepo/webev-client/src/components/common/Parts/Footer/Footer';

import { BootstrapBreakpoints } from '@monorepo/webev-client/src/libs/interfaces/variables';
import { zIndex } from '@monorepo/webev-client/src/libs/constants/zIndex';

export const DefaultLayout: FC = ({ children }) => {
  return (
    <div>
      <div className="bg-dark">
        <Navbar />
      </div>
      <StyledBorder />
      <div className="webev-container container pt-3">{children}</div>
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
    z-index: ${zIndex.TOP_BORDER};
  }
`;
