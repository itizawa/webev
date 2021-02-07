import { FC } from 'react';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';

const Index: FC = () => {
  const { data: pages } = usePageListSWR();

  if (pages == null) {
    return <></>;
  }

  return (
    <div className="p-3">
      <h1>Home</h1>
      <div className="row gap-3">
        {pages.map((page) => (
          <div className="col-lg-3" key={page._id}>
            <OgpCard url={page?.url} image={page?.image} description={page?.description} title={page?.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
