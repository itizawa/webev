import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

import { Container, Grid } from '@nextui-org/react';

import { Navbar } from '~/components/common/Parts/Navbar';
import { Sidebar } from '~/components/common/Parts/Sidebar';
// import { FooterSubnavBar } from '~/components/common/FooterSubnavBar';
import { Footer } from '~/components/common/Parts/Footer';

// import { DirectoryCreateModal } from '~/components/domain/Directory/molecules/DirectoryCreateModal';
// import { DirectoryDeleteModal } from '~/components/domain/Directory/molecules/DirectoryDeleteModal';
// import { DirectoryRenameModal } from '~/components/domain/Directory/molecules/DirectoryRenameModal';
// import { PageSaveModal } from '~/components/domain/Page/molecules/PageSaveModal';

// import { ShareLinkReceiverModal } from '~/components/domain/ShareLink/molecules/ShareLinkReceiverModal';
// import { TutorialDetectorModal } from '~/components/domain/Tutorial/molecules/TutorialDetectorModal';
import { ScrollTopButton } from '~/components/case/atoms/ScrollTopButton';

import { usePagePagination } from '~/hooks/Page';
import { zIndex } from '~/libs/constants/zIndex';

type Props = {
  children: ReactNode;
};

export const DashBoardLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { setActivePage } = usePagePagination();

  useEffect(() => {
    setActivePage(1);
  }, [setActivePage, router]);

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
      {/* <FooterSubnavBar /> */}
      {/* 画面全体からNavbarとFooterの高さを引く */}
      <Grid.Container css={{ minHeight: 'calc(100vh - 100px - 100px)', pt: '$8', pb: '$48', mx: 'auto' }}>
        <Grid sm={3} css={{ display: 'none', justifyContent: 'center' }}>
          <Sidebar />
        </Grid>
        <Grid xs={12} sm={9}>
          {children}
        </Grid>
      </Grid.Container>

      {/* {session && (
        <>
          <DirectoryCreateModal />
            <DirectoryDeleteModal />
          <DirectoryRenameModal />
          <PageSaveModal />
        </>
      )}
      {session && <ShareLinkReceiverModal />}
      {currentUser && <TutorialDetectorModal />} */}
      {/* 横幅調整のためにdivでwrapしている */}
      <div>
        <ScrollTopButton />
      </div>
      <Footer />
    </Container>
  );
};
