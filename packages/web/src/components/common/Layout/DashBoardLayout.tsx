import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

import { Container, Grid } from '@nextui-org/react';

import { FooterSubnavBar } from '../Parts/FooterSubnavBar/FooterSubnavBar';
import { Navbar } from '@webev/web/components/common/Parts/Navbar';
import { Sidebar } from '@webev/web/components/common/Parts/Sidebar';
import { Footer } from '@webev/web/components/common/Parts/Footer';

// import { DirectoryCreateModal } from '@webev/web/components/domain/Directory/molecules/DirectoryCreateModal';
// import { DirectoryDeleteModal } from '@webev/web/components/domain/Directory/molecules/DirectoryDeleteModal';
// import { DirectoryRenameModal } from '@webev/web/components/domain/Directory/molecules/DirectoryRenameModal';
// import { PageSaveModal } from '@webev/web/components/domain/Page/molecules/PageSaveModal';

import { ScrollTopButton } from '@webev/web/components/uiParts/ScrollTopButton';

import { usePagePagination } from '@webev/web/hooks/Page';
import { zIndex } from '@webev/web/libs/constants/zIndex';
import { useModal } from '@webev/web/hooks/useModal';
import { usePagesCountByUserId } from '@webev/web/stores/Page';
import { useCurrentUser } from '@webev/web/stores/User';

type Props = {
  children: ReactNode;
};

export const DashBoardLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const { setActivePage } = usePagePagination();
  const { data: pagesCountByUserId, isLoading: isLoadingPagesCountByUserId } = usePagesCountByUserId(currentUser?.id);
  const { handleModal } = useModal();

  useEffect(() => {
    setActivePage(1);
  }, [setActivePage, router]);

  useEffect(() => {
    if (!isLoadingPagesCountByUserId && pagesCountByUserId === 0) {
      handleModal({ name: 'tutorialDetectorModal', args: {} });
    }
  }, [handleModal, isLoadingPagesCountByUserId, pagesCountByUserId]);

  useEffect(() => {
    if (typeof router.query.url === 'string') {
      handleModal({ name: 'shareLinkReceiverModal', args: { url: router.query.url } });
    }
  }, [handleModal, router]);

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
      <Grid css={{ '@sm': { display: 'none' } }}>
        <FooterSubnavBar />
      </Grid>
      {/* 画面全体からNavbarとFooterの高さを引く */}
      <Grid
        css={{
          maxWidth: '1280px',
          minHeight: 'calc(100vh - 100px - 100px)',
          pt: '$8',
          px: '$8',
          pb: '$48',
          mx: 'auto',
          display: 'flex',
          gap: '32px',
        }}
      >
        <Grid css={{ '@smMax': { display: 'none' } }}>
          <Sidebar />
        </Grid>
        {children}
      </Grid>
      {/* {session && (
        <>
          <DirectoryCreateModal />
            <DirectoryDeleteModal />
          <DirectoryRenameModal />
          <PageSaveModal />
        </>
      )}
      {session && <ShareLinkReceiverModal />} */}
      {/* 横幅調整のためにdivでwrapしている */}
      <div>
        <ScrollTopButton />
      </div>
      <Footer />
    </Container>
  );
};
