import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';

const Index: FC = () => {
  const [cnt, setCnt] = useState(1);
  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<Page activePage={i + 1} key={i} />);
  }

  return (
    <div className="p-3">
      <h1>Home</h1>
      {pages}
      <div className="text-center">
        <button className="btn btn-primary" onClick={() => setCnt(cnt + 1)}>
          Load More
        </button>
      </div>
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
        <div className="col-lg-4 col-md-6">
          <Skeleton height={300} />
        </div>

        <div className="col-lg-4 col-md-6">
          <Skeleton height={300} />
        </div>
        <div className="col-lg-4 col-md-6">
          <Skeleton height={300} />
        </div>
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
