import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import InfiniteScroll from 'react-infinite-scroller';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';

const Index: FC = () => {
  const [cnt, setCnt] = useState(1);
  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<Page activePage={i + 1} key={i} />);
  }

  const loadMore = async (page: number) => {
    setCnt(page + 1);
  };

  const skeletonForLoading = (
    <div className="row mt-4">
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
      <InfiniteScroll loadMore={loadMore} hasMore={true} loader={skeletonForLoading} element="div">
        {pages}
      </InfiniteScroll>
    </div>
  );
};

type Props = {
  activePage: number;
};

const Page: FC<Props> = ({ activePage }: Props) => {
  const { data: paginationResult } = usePageListSWR(activePage);

  // 取得中の場合は スケルトンを表示する
  if (paginationResult == null) {
    return (
      <div className="row mt-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="col-lg-4 col-md-6 mb-3">
            <Skeleton height={300} />
          </div>
        ))}
      </div>
    );
  }

  const { docs: pages } = paginationResult;

  return (
    <div className="row mt-4">
      {pages.map((page) => (
        <div className="col-lg-4 col-md-6 mb-3" key={page._id}>
          <OgpCard page={page} />
        </div>
      ))}
    </div>
  );
};

export default Index;
