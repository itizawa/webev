import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { getSession } from 'next-auth/client';

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
      <div className="row mt-4">{pages}</div>
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
  const { data: paginationResult } = usePageListSWR(activePage, 9, true);

  // 取得中の場合は スケルトンを表示する
  if (paginationResult == null) {
    return (
      <>
        <div className="col-lg-4 col-md-6">
          <Skeleton height={300} />
        </div>

        <div className="col-lg-4 col-md-6">
          <Skeleton height={300} />
        </div>
        <div className="col-lg-4 col-md-6">
          <Skeleton height={300} />
        </div>
      </>
    );
  }

  const { docs: pages } = paginationResult;

  return (
    <>
      {pages.map((page) => (
        <div className="col-lg-4 col-md-6 mb-3" key={page._id}>
          <OgpCard page={page} />
        </div>
      ))}
    </>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (session == null) {
    context.res.setHeader('location', '/');
    context.res.statusCode = 302;
    return context.res.end();
  }

  return { props: {} };
};

export default Index;
