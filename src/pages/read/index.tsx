import { useEffect, ReactNode, useState } from 'react';
import { Triangle } from 'react-loader-spinner';

import { usePageListSWR, usePageStatus } from '~/stores/page';

import { useLocale } from '~/hooks/useLocale';

import { SearchTextBox } from '~/components/case/molecules/SearchTextBox';
import { LoginRequiredWrapper } from '~/components/common/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/common/SortButtonGroup';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';
import { PageList } from '~/components/domain/Page/molecules/PageList';

import { PageStatus } from '~/domains/Page';
import { WebevNextPage } from '~/libs/interfaces/webevNextPage';
import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';

const Page: WebevNextPage = () => {
  const { t } = useLocale();

  const [value, setValue] = useState('');
  const { mutate: mutatePageStatus } = usePageStatus();
  const { data: paginationResult } = usePageListSWR();

  useEffect(() => {
    mutatePageStatus([PageStatus.PAGE_STATUS_ARCHIVE]);
  }, [mutatePageStatus]);

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.read}`} />
      <LoginRequiredWrapper>
        <div className="d-flex align-items-center">
          <h1 className="mb-0">{t.read}</h1>
          <div className="ms-auto">
            <span className="badge rounded-pill bg-secondary text-white">{paginationResult?.totalDocs} Pages</span>
          </div>
        </div>
        <div className="my-3 d-flex flex-column flex-sm-row justify-content-between gap-3">
          <SearchTextBox onChange={(text) => setValue(text)} />
          <SortButtonGroup />
        </div>
        {paginationResult == null && (
          <div className="pt-5 d-flex align-items-center justify-content-center">
            <Triangle color="#00BFFF" height={100} width={100} />
          </div>
        )}
        {paginationResult != null && <PageList pages={paginationResult.docs} pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />}
      </LoginRequiredWrapper>
    </>
  );
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Page.getLayout = getLayout;
export default Page;
