import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

import { Container, Grid } from '@nextui-org/react';

import { isEmpty } from 'lodash';
import { FooterSubnavBar } from '../Parts/FooterSubnavBar/FooterSubnavBar';
import { Navbar } from '~/components/common/Parts/Navbar';
import { Sidebar } from '~/components/common/Parts/Sidebar';
// import { FooterSubnavBar } from '~/components/common/FooterSubnavBar';
import { Footer } from '~/components/common/Parts/Footer';

// import { DirectoryCreateModal } from '~/components/domain/Directory/molecules/DirectoryCreateModal';
// import { DirectoryDeleteModal } from '~/components/domain/Directory/molecules/DirectoryDeleteModal';
// import { DirectoryRenameModal } from '~/components/domain/Directory/molecules/DirectoryRenameModal';
// import { PageSaveModal } from '~/components/domain/Page/molecules/PageSaveModal';

// import { ShareLinkReceiverModal } from '~/components/domain/ShareLink/molecules/ShareLinkReceiverModal';
import { ScrollTopButton } from '~/components/uiParts/ScrollTopButton';

import { usePagePagination } from '~/hooks/Page';
import { zIndex } from '~/libs/constants/zIndex';
import { useCurrentUser } from '~/stores/users';
import { useModal } from '~/hooks/useModal';

type Props = {
  children: ReactNode;
};

export const DashBoardLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { setActivePage, paginationPage, isLoadingPaginationPage } = usePagePagination();
  const { data: currentUser, isLoading: isLoadingCurrentUser } = useCurrentUser();
  const { handleModal } = useModal();

  useEffect(() => {
    setActivePage(1);
  }, [setActivePage, router]);

  useEffect(() => {
    if (!isLoadingPaginationPage && isEmpty(paginationPage?.totalDocs)) {
      handleModal({ name: 'tutorialDetectorModal', args: {} });
    }
  }, [currentUser, handleModal, isLoadingCurrentUser, isLoadingPaginationPage, paginationPage?.totalDocs]);

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
          gap: '$8',
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
