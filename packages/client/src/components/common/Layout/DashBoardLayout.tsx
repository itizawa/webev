import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import styled from 'styled-components';

import { useCurrentUser } from '@monorepo/client/src/stores/user';

import { Navbar } from '@monorepo/client/src/components/common/Navbar';
import { Sidebar } from '@monorepo/client/src/components/common/Sidebar';
import { FooterSubnavBar } from '@monorepo/client/src/components/common/FooterSubnavBar';
import { Footer } from '@monorepo/client/src/components/common/Parts/Footer';

// import { DirectoryCreateModal } from '@monorepo/client/src/components/domain/Directory/molecules/DirectoryCreateModal';
// import { DirectoryDeleteModal } from '@monorepo/client/src/components/domain/Directory/molecules/DirectoryDeleteModal';
// import { DirectoryRenameModal } from '@monorepo/client/src/components/domain/Directory/molecules/DirectoryRenameModal';
import { PageSaveModal } from '@monorepo/client/src/components/domain/Page/molecules/PageSaveModal';

import { ShareLinkReceiverModal } from '@monorepo/client/src/components/domain/ShareLink/molecules/ShareLinkReceiverModal';
import { TutorialDetectorModal } from '@monorepo/client/src/components/domain/Tutorial/molecules/TutorialDetectorModal';
import { ScrollTopButton } from '@monorepo/client/src/components/case/atoms/ScrollTopButton';

import { usePagePagination } from '@monorepo/client/src/hooks/Page';

export const DashBoardLayout: FC = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { setActivePage } = usePagePagination();

  const { data: currentUser } = useCurrentUser();

  useEffect(() => {
    setActivePage(1);
  }, [setActivePage, router]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div>
      <div className="bg-dark">
        <Navbar />
      </div>
      <StyledBorder />
      <FooterSubnavBar />
      <StyledDiv className="row mx-auto overflow-hidden">
        <div className="d-none d-md-block col-md-3">
          <Sidebar />
        </div>
        <div className="col-12 col-md-8 pt-3">{children}</div>
        {session && (
          <>
            {/* <DirectoryCreateModal />
            <DirectoryDeleteModal />
            <DirectoryRenameModal /> */}
            <PageSaveModal />
          </>
        )}
        {session && <ShareLinkReceiverModal />}
        {currentUser && <TutorialDetectorModal />}
        {/* 横幅調整のためにdivでwrapしている */}
        <div>
          <ScrollTopButton />
        </div>
      </StyledDiv>
      <Footer />
    </div>
  );
};

const StyledDiv = styled.div`
  max-width: 1440px;
  /* 画面全体からNavbarとFooterの高さを引く */
  min-height: calc(100vh - 100px - 100px);
`;

const StyledBorder = styled.div`
  height: 4px;
  background: linear-gradient(90deg, #f6d02e 0, #f87c00 47%, #f6d02e);
`;
