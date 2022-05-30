import { ReactNode, useEffect } from 'react';

import { useLocale } from '~/hooks/useLocale';

import { SearchTextBox } from '~/components/case/molecules/SearchTextBox';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/domain/Page/SortButtonGroup/SortButtonGroup';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { usePagePagination } from '~/hooks/Page';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const { paginationPage, setIsArchived } = usePagePagination();
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
            <span className="badge rounded-pill bg-secondary text-white">{paginationPage?.totalDocs} Pages</span>
          </div>
        </div>
        <div className="my-3 d-flex flex-column flex-sm-row justify-content-between gap-3">
          <SearchTextBox />
          <SortButtonGroup />
        </div>
        {paginationPage == null && (
          <div className="pt-5 d-flex align-items-center justify-content-center">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {/* {paginationPage != null && (
          <PageList pages={paginationPage.docs} pagingLimit={paginationPage.limit} totalItemsCount={paginationPage.totalDocs} />
        )} */}
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
