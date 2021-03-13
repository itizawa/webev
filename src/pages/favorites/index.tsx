import { VFC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';
import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';

const Index: VFC = () => {
  const { data, size, setSize } = usePageListSWR();
  console.log(data);
  if (data == null) return <>loading</>;

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        <div className="p-3">
          <h1>Home</h1>

          <div className="text-center">
            <button className="btn btn-primary" onClick={() => setSize(size + 1)}>
              Load More
            </button>
          </div>
        </div>
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

export default Index;
