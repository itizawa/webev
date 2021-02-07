import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';

const Index: FC = () => {
  const { data: pages } = usePageListSWR();

  return (
    <div className="p-3">
      <h1>Home</h1>
      <div className="row gap-3">
        {pages == null ? (
          <>
            <div className="col-lg-3">
              <Skeleton height={300} />
            </div>
            <div className="col-lg-3">
              <Skeleton height={300} />
            </div>
            <div className="col-lg-3">
              <Skeleton height={300} />
            </div>
          </>
        ) : (
          <>
            {pages.map((page) => (
              <div className="col-lg-3" key={page._id}>
                <OgpCard url={page?.url} image={page?.image} description={page?.description} title={page?.title} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
