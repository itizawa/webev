import { FC, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import InfiniteScroll from 'react-infinite-scroller';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';

import { Page } from '~/interfaces/page';

const Index: FC = () => {
  const [activePage, setCnt] = useState(1);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [pages, setPages] = useState([] as Page[]);
  const { data: paginationResult, isValidating } = usePageListSWR(activePage);

  const loadMore = async (activePage: number) => {
    if (!isValidating) {
      setHasPrevPage(false);
      setCnt(activePage + 1);
    }
  };

  useEffect(() => {
    if (paginationResult != null) {
      setPages([...pages, ...paginationResult.docs]);
      setHasPrevPage(paginationResult.hasNextPage);
    }
  }, [paginationResult]);

  const skeletonForLoading = (
    <div className="row mt-4" key={0}>
      {[...Array(9)].map((_, i) => (
        <div key={i} className="col-lg-4 col-md-6 mb-3">
          <Skeleton height={300} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-3">
      <h1>Home</h1>
      <InfiniteScroll loadMore={loadMore} hasMore={hasPrevPage} loader={skeletonForLoading} element="div">
        <div className="row mt-4">
          {pages.map((page) => (
            <div className="col-lg-4 col-md-6 mb-3" key={page._id}>
              <OgpCard page={page} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Index;
