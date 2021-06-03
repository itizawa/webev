import { FC, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Footer } from '../organisms/Footer';
import { SocketConnector } from '~/components/SocketConnector';

import { useActivePage, useDirectoryId, usePageStatus, useSearchKeyWord } from '~/stores/page';

import { Navbar } from '~/components/organisms/Navbar';
import { Sidebar } from '~/components/organisms/Sidebar';
import { SubnavBar } from '~/components/organisms/SubnavBar';
import { PageModals } from '~/components/PageModals/PageModals';
import { ScrollTopButton } from '~/components/Commons/ScrollTopButton';

import { BootstrapBreakpoints } from '~/interfaces/variables';
import { PathConfigs, PathNames } from '~/interfaces/route';

export const DashBoardLayout: FC = ({ children }) => {
  const [session] = useSession();
  const router = useRouter();
  const pathname = router.pathname as PathNames;
  const { mutate: mutateActivePage } = useActivePage();
  const { mutate: mutateDirectoryId } = useDirectoryId();

  const { mutate: mutatePageStatus } = usePageStatus();
  const { mutate: mutateSearchKeyord } = useSearchKeyWord();

  if (typeof window === 'undefined') {
    return null;
  }

  useEffect(() => {
    mutatePageStatus(PathConfigs[pathname].statusForFind);
    mutateSearchKeyord('');

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
        {session && <PageModals />}
        {session && <SocketConnector />}
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
