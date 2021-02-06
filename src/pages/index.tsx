import React, { useEffect, useState } from 'react';

import { apiGet } from '~/utils/rest-client';

import { Page as IPage } from '~/interfaces/page';
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

  console.log(pages);

  return (
    <div className="row">
      <div className="col-3">{/* <OgpCard url={url} image={image} description={description} title={title} /> */}</div>
    </div>
  );
};

export default Index;
