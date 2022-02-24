import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useActivePage, useDirectoryId } from '~/stores/page';
import { useCurrentUser } from '~/stores/user';

import { Navbar } from '~/components/common/Navbar';
import { Sidebar } from '~/components/common/Sidebar';
import { FooterSubnavBar } from '~/components/common/FooterSubnavBar';
import { Footer } from '~/components/common/Parts/Footer';

import { DirectoryCreateModal } from '~/components/domain/Directory/molecules/DirectoryCreateModal';
import { DirectoryDeleteModal } from '~/components/domain/Directory/molecules/DirectoryDeleteModal';
import { DirectoryRenameModal } from '~/components/domain/Directory/molecules/DirectoryRenameModal';
import { PageAddToDirectoryModal } from '~/components/domain/Page/molecules/PageAddToDirectoryModal';
import { PageDeleteModal } from '~/components/domain/Page/molecules/PageDeleteModal';
import { PageSaveModal } from '~/components/domain/Page/molecules/PageSaveModal';

import { ShareLinkReceiverModal } from '~/components/domain/ShareLink/molecules/ShareLinkReceiverModal';
import { TutorialDetectorModal } from '~/components/domain/Tutorial/molecules/TutorialDetectorModal';
import { ScrollTopButton } from '~/components/case/atoms/ScrollTopButton';

import { DIRECTORY_ID_URL } from '~/libs/constants/urls';

export const DashBoardLayout: FC = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { mutate: mutateActivePage } = useActivePage();
  const { mutate: mutateDirectoryId } = useDirectoryId();

  const { data: currentUser } = useCurrentUser();

  useEffect(() => {
    if (router.pathname !== DIRECTORY_ID_URL) {
      mutateDirectoryId(null);
    }
    mutateActivePage(1);
  }, [mutateActivePage, mutateDirectoryId, router]);

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
            <DirectoryCreateModal />
            <DirectoryDeleteModal />
            <DirectoryRenameModal />
            <PageDeleteModal />
            <PageAddToDirectoryModal />
            <PageSaveModal />
          </>
        )}
        {session && <ShareLinkReceiverModal />}
        {currentUser && <TutorialDetectorModal />}
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
