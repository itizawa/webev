import { VFC } from 'react';

import { usePageListSWR } from '~/stores/page';

import { useLocale } from '~/hooks/useLocale';

import { OgpCard } from '~/components/organisms/OgpCard';
import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';
import { SortButtonGroup } from '~/components/Commons/SortButtonGroup';

const Index: VFC = () => {
  const { t } = useLocale();

  const { data: paginationResult } = usePageListSWR();

  return (
    <LoginRequiredWrapper>
      <div className="p-3">
        <div className="d-flex align-items-center">
          <h1>{t.archive}</h1>
          <div className="ms-auto">
            <span className="badge rounded-pill bg-secondary text-white">{paginationResult?.totalDocs} Pages</span>
          </div>
        </div>
        <div className="my-2 d-flex">
          <div className="ms-auto">
            <SortButtonGroup />
          </div>
        </div>
        {paginationResult != null && (
          <div className="row">
            {paginationResult.docs.map((page) => (
              <div className="col-xl-4 col-md-6 mb-3" key={page._id}>
                <OgpCard page={page} />
              </div>
            ))}
            {paginationResult.docs.length !== 0 && (
              <div className="text-center">
                <PaginationWrapper pagingLimit={paginationResult.limit} totalItemsCount={paginationResult.totalDocs} />
              </div>
            )}
          </div>
        )}
      </div>
    </LoginRequiredWrapper>
  );
};

export default Index;
