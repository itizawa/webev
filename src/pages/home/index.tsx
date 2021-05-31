import { VFC } from 'react';
import Loader from 'react-loader-spinner';

import { usePageListSWR } from '~/stores/page';
import { useLocale } from '~/hooks/useLocale';

import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';
import { PageList } from '~/components/Page/PageList';

const Index: VFC = () => {
  const { t } = useLocale();

  const { data: paginationResult } = usePageListSWR();

  return (
    <LoginRequiredWrapper>
      <div className="p-3">
        <div className="d-flex align-items-center">
          <h1 className="mb-0">{t.home}</h1>
          <div className="ms-auto">
            <span className="badge rounded-pill bg-secondary text-white">{paginationResult?.totalDocs} Pages</span>
          </div>
        </div>
        <div className="my-2 d-flex">
          <div className="ms-auto">
            <SortButtonGroup />
          </div>
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
  );
};

export default Index;
