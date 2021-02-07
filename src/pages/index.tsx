import React, { useEffect, useState } from 'react';

import { apiGet } from '~/utils/rest-client';

import { IPage } from '~/interfaces/page';
import { OgpCard } from '~/components/organisms/OgpCard';

const Index: React.FC = () => {
  const [pages, setPages] = useState([] as IPage[]);

  useEffect(() => {
    const retrieveOgp = async (): Promise<void> => {
      const res = await apiGet('/pages/list');
      console.log(res.data);
      const pages = res.data as IPage[];
      setPages(pages);
    };
    retrieveOgp();
  }, []);

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
