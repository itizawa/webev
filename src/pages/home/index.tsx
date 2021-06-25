import { useEffect, VFC } from 'react';
import Loader from 'react-loader-spinner';

import { WebevOgpHead } from '~/components/Commons/WebevOgpHead';

import { PageStatus } from '~/domains/Page';
import { usePageListSWR, usePageStatus } from '~/stores/page';
import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';
import { SearchForm } from '~/components/Commons/SearchForm';
import { PageList } from '~/components/Page/PageList';

const Index: VFC = () => {
  const { t } = useLocale();

  const { data: paginationResult } = usePageListSWR();
  const { mutate: mutatePageStatus } = usePageStatus();

  useEffect(() => {
    mutatePageStatus([PageStatus.PAGE_STATUS_STOCK]);
  }, []);

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.home}`} />
      <LoginRequiredWrapper>
        <div className="p-3">
          <div className="d-flex align-items-center">
            <h1 className="mb-0">{t.home}</h1>
            <div className="ms-auto">
              <span className="badge rounded-pill bg-secondary text-white">{paginationResult?.totalDocs} Pages</span>
            </div>
          </div>
          <div className="my-3 d-flex flex-column flex-sm-row justify-content-between gap-3">
            <div>
              <SearchForm />
            </div>
            <SortButtonGroup />
          </div>
          {paginationResult == null && (
            <div className="text-center pt-5">
              <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
            </div>
          )}
          {paginationResult != null && (
            <PageList pages={paginationResult?.docs} pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />
          )}
        </div>
      </LoginRequiredWrapper>
    </>
  );
};

export default Index;
