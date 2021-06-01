import { VFC } from 'react';
import Loader from 'react-loader-spinner';

import { usePageListSWR } from '~/stores/page';

import { useLocale } from '~/hooks/useLocale';

import { PageList } from '~/components/Page/PageList';
import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';
import { SearchForm } from '~/components/Commons/SearchForm';

const Index: VFC = () => {
  const { t } = useLocale();

  const { data: paginationResult } = usePageListSWR();

  return (
    <LoginRequiredWrapper>
      <div className="p-3">
        <div className="d-flex align-items-center">
          <h1 className="mb-0">{t.read}</h1>
          <div className="ms-auto">
            <span className="badge rounded-pill bg-secondary text-white">{paginationResult?.totalDocs} Pages</span>
          </div>
        </div>
        <div className="my-3 d-flex justify-content-between">
          <div>
            <SearchForm />
          </div>
          <div>
            <SortButtonGroup />
          </div>
        </div>
        {paginationResult == null && (
          <div className="text-center pt-5">
            <Loader type="Triangle" color="#00BFFF" height={100} width={100} />
          </div>
        )}
        {paginationResult != null && <PageList pages={paginationResult.docs} pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />}
      </div>
    </LoginRequiredWrapper>
  );
};

export default Index;
