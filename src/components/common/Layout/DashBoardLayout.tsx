import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useActivePage, useDirectoryId } from '~/stores/page';
import { useCurrentUser } from '~/stores/user';

import { Navbar } from '~/components/common/Navbar';
import { Sidebar } from '~/components/common/Sidebar';
import { SubnavBar } from '~/components/common/SubnavBar';
import { Footer } from '~/components/common/Footer';

import { DirectoryAddModal } from '~/components/domain/Directory/molecules/DirectoryAddModal';
import { DirectoryCreateModal } from '~/components/domain/Directory/molecules/DirectoryCreateModal';
import { DirectoryDeleteModal } from '~/components/domain/Directory/molecules/DirectoryDeleteModal';
import { DirectoryRenameModal } from '~/components/domain/Directory/molecules/DirectoryRenameModal';
import { PageDeleteModal } from '~/components/domain/Page/molecules/PageDeleteModal';
import { PageSaveModal } from '~/components/domain/Page/molecules/PageSaveModal';

import { SocketConnector } from '~/components/domain/Socket/SocketConnector';
import { ShareLinkReceiverModal } from '~/components/domain/ShareLink/molecules/ShareLinkReceiverModal';
import { TutorialDetectorModal } from '~/components/domain/Tutorial/molecules/TutorialDetectorModal';
import { ScrollTopButton } from '~/components/case/atoms/ScrollTopButton';

import { BootstrapBreakpoints } from '~/interfaces/variables';

export const DashBoardLayout: FC = ({ children }) => {
  const [session] = useSession();
  const router = useRouter();
  const { mutate: mutateActivePage } = useActivePage();
  const { mutate: mutateDirectoryId } = useDirectoryId();

  const { data: currentUser } = useCurrentUser();

  if (typeof window === 'undefined') {
    return null;
  }

  useEffect(() => {
    if (router.pathname !== '/directory/[id]') {
      mutateDirectoryId(null);
    }
    mutateActivePage(1);
  }, [router]);

  return (
    <div>
      <div className="bg-dark">
        <Navbar />
      </div>
      <StyledBorder />
      <SubnavBar />
      <StyledDiv className="d-flex mx-auto">
        <div className="d-none d-md-block col-md-3">
          <Sidebar />
        </div>
        <div className="col-12 col-md-9">{children}</div>
        {session && (
          <>
            <DirectoryAddModal />
            <DirectoryCreateModal />
            <DirectoryDeleteModal />
            <DirectoryRenameModal />
            <PageDeleteModal />
            <PageSaveModal />
          </>
        )}
        {session && <SocketConnector />}
        {session && <ShareLinkReceiverModal />}
        {currentUser && <TutorialDetectorModal />}
        <ScrollTopButton />
      </StyledDiv>
      <Footer />
    </div>
  );
};

const StyledDiv = styled.div`
  max-width: 1240px;
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
