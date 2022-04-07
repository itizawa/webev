import { ReactNode, useEffect } from 'react';

import { useLocale } from '@monorepo/client/src/hooks/useLocale';

import { SearchTextBox } from '@monorepo/client/src/components/case/molecules/SearchTextBox';
import { LoginRequiredWrapper } from '@monorepo/client/src/components/common/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '@monorepo/client/src/components/common/SortButtonGroup';
import { WebevOgpHead } from '@monorepo/client/src/components/common/WebevOgpHead';
import { PageList } from '@monorepo/client/src/components/domain/Page/molecules/PageList';

import { WebevNextPage } from '@monorepo/client/src/libs/interfaces/webevNextPage';
import { DashBoardLayout } from '@monorepo/client/src/components/common/Layout/DashBoardLayout';
import { usePagePagination } from '@monorepo/client/src/hooks/Page';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const { pagePagination, setIsArchived } = usePagePagination();
  useEffect(() => {
    setIsArchived(true);
  }, [setIsArchived]);

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.read}`} />
      <LoginRequiredWrapper>
        <div className="d-flex align-items-center">
          <h1 className="mb-0">{t.read}</h1>
          <div className="ms-auto">
            <span className="badge rounded-pill bg-secondary text-white">{pagePagination?.totalDocs} Pages</span>
          </div>
        </div>
        <div className="my-3 d-flex flex-column flex-sm-row justify-content-between gap-3">
          <SearchTextBox />
          <SortButtonGroup />
        </div>
        {pagePagination == null && (
          <div className="pt-5 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {pagePagination != null && (
          <PageList pages={pagePagination.docs} pagingLimit={pagePagination.limit} totalItemsCount={pagePagination.totalDocs} />
        )}
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
