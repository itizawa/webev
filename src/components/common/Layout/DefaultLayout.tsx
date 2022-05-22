import { ReactNode, VFC } from 'react';
import styled from 'styled-components';

import { Container } from '@nextui-org/react';
import { Navbar } from '~/components/common/Parts/Navbar';
import { Footer } from '~/components/common/Parts/Footer/Footer';

import { BootstrapBreakpoints } from '~/libs/interfaces/variables';
import { zIndex } from '~/libs/constants/zIndex';

type Props = {
  children: ReactNode;
};

export const DefaultLayout: VFC<Props> = ({ children }) => {
  return (
    <Container fluid css={{ padding: '$0', minHeight: '100vh', bgColor: '$background' }}>
      <Navbar />
      <StyledBorder />
      <div className="webev-container container pt-3">{children}</div>
      <Footer />
    </Container>
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
