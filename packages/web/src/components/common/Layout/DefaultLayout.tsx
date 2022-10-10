import { FC, ReactNode } from 'react';

import { Container, Grid } from '@nextui-org/react';
import { Navbar } from '@webev/web/components/common/Parts/Navbar';
import { Footer } from '@webev/web/components/common/Parts/Footer/Footer';

import { zIndex } from '@webev/web/libs/constants/zIndex';

type Props = {
  children: ReactNode;
};

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <Container css={{ padding: '$0', bgColor: '$background' }} fluid responsive={false}>
      <Navbar />
      <Grid
        css={{
          height: '4px',
          width: '100%',
          background: 'linear-gradient(90deg, #f6d02e 0, #f87c00 47%, #f6d02e);',
          position: 'sticky',
          top: 0,
          zIndex: zIndex.TOP_BORDER,
          ml: '$0',
        }}
      />
      {/* 画面全体からNavbarとFooterの高さを引く */}
      <Container css={{ minHeight: 'calc(100vh - 100px - 100px)', pt: '$8', pb: '$48' }}>{children}</Container>
      <Footer />
    </Container>
  );
};
