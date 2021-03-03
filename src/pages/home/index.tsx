import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';
import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';

const Index: FC = () => {
  const [activePage, setActivePage] = useState(1);
  const { data: paginationResult } = usePageListSWR(activePage);

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          <h1>Home</h1>
          <div className="row">
            {paginationResult == null ? (
              [...Array(9)].map((_, i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <Skeleton height={300} />
                </div>
              ))
            ) : (
              <>
                {paginationResult.docs.map((page) => (
                  <div className="col-lg-4 col-md-6 mb-3" key={page._id}>
                    <OgpCard page={page} />
                  </div>
                ))}
                <div className="text-center">
                  <PaginationWrapper
                    activePage={activePage}
                    pagingLimit={paginationResult.limit}
                    totalItemsCount={paginationResult.totalDocs}
                    changePage={setActivePage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

export default Index;
