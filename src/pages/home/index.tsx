import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';

const Index: FC = () => {
  return (
    <div className="p-3">
      <h1>Home</h1>
      <Page activePage={1} />
      <Page activePage={2} />
    </div>
  );
};

type Props = {
  activePage: number;
};

const Page: FC<Props> = ({ activePage }: Props) => {
  const { data: pages } = usePageListSWR(activePage);

  return (
    <div className="row mt-4">
      {pages == null ? (
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
      ) : (
        pages.map((page) => (
          <div className="col-lg-4 col-md-6 mb-3" key={page._id}>
            <OgpCard page={page} />
          </div>
        ))
      )}
    </div>
  );
};

export default Index;
