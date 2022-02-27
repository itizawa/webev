import { ReactNode } from 'react';
import { Triangle } from 'react-loader-spinner';

import { useLocale } from '~/hooks/useLocale';

import { SearchTextBox } from '~/components/case/molecules/SearchTextBox';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/common/SortButtonGroup';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { PageList } from '~/components/domain/Page/molecules/PageList';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { usePagePagination } from '~/hooks/Page';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const { pagePagination } = usePagePagination();

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
            <Triangle color="#00BFFF" height={100} width={100} />
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
