import { useRouter } from 'next/router';
import { VFC } from 'react';
import styled from 'styled-components';

import { URLS } from '@webev/web/libs/constants/urls';

import { Navbar } from '@webev/web/components/common/Parts/Navbar';
import { Footer } from '@webev/web/components/common/Parts/Footer/Footer';
import { useLocale } from '@webev/web/hooks/useLocale';

export const MaintenanceLayout: VFC = () => {
  const { t } = useLocale();
  const router = useRouter();

  return (
    <div className="h-100">
      <div className="bg-dark">
        <Navbar />
      </div>
      <StyledDiv className="container text-center pt-5">
        <h1>{t.maintenance}</h1>
        <button className="mt-4 btn btn-indigo btn-bg" onClick={() => router.push(URLS.TOP_URL)}>
          {t.go_to_top}
        </button>
      </StyledDiv>
      <Footer />
    </div>
  );
};

const StyledDiv = styled.div`
  /* 画面全体からNavbarとFooterの高さを引く */
  min-height: calc(100vh - 100px - 100px);
`;
