import { VFC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { usePageListSWR } from '~/stores/page';
import { OgpCard } from '~/components/organisms/OgpCard';
import { LoginRequiredWrapper } from '~/components/Authentication/LoginRequiredWrapper';
import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';
import { PaginationWrapper } from '~/components/Commons/PaginationWrapper';

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

const Page: VFC<Props> = ({ activePage }: Props) => {
  const { data: pages = [] } = usePageListSWR(activePage);

  return (
    <LoginRequiredWrapper>
      <DashBoardLayout>
        {pages.map((page) => (
          <></>
          // <div className="col-lg-4 col-md-6 mb-3" key={page?._id}>
          //   {page != null && <OgpCard page={page} />}
          // </div>
        ))}
      </DashBoardLayout>
    </LoginRequiredWrapper>
  );
};

export default Index;
