import { ReactNode, useEffect } from 'react';

import { WebevOgpHead } from '@monorepo/webev-client/src/components/common/WebevOgpHead';

import { WebevNextPage } from '@monorepo/webev-client/src/libs/interfaces/webevNextPage';

import { SearchTextBox } from '@monorepo/webev-client/src/components/case/molecules/SearchTextBox';
import { LoginRequiredWrapper } from '@monorepo/webev-client/src/components/common/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '@monorepo/webev-client/src/components/common/SortButtonGroup';
import { PageList } from '@monorepo/webev-client/src/components/domain/Page/molecules/PageList';
import { DashBoardLayout } from '@monorepo/webev-client/src/components/common/Layout/DashBoardLayout';
import { usePagePagination } from '@monorepo/webev-client/src/hooks/Page';
import { useLocale } from '@monorepo/webev-client/src/hooks/useLocale';

const Index: WebevNextPage = () => {
  const { t } = useLocale();
  const { pagePagination, setIsArchived } = usePagePagination();
  useEffect(() => {
    setIsArchived(false);
  }, [setIsArchived]);

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.home}`} />
      <LoginRequiredWrapper>
        <div className="d-flex align-items-center">
          <h1 className="mb-0">{t.home}</h1>
          <div className="ms-auto">
            <span className="badge rounded-pill bg-secondary text-white">{pagePagination?.totalDocs} Pages</span>
          </div>
        </div>
        <div className="my-3 d-flex flex-column flex-sm-row justify-content-between gap-3">
          <SearchTextBox />
          <SortButtonGroup />
        </div>
        {!pagePagination && (
          <div className="pt-5 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {pagePagination && (
          <PageList pages={pagePagination?.docs} pagingLimit={pagePagination.limit} totalItemsCount={pagePagination.totalDocs} />
        )}
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Index.getLayout = getLayout;
export default Index;
