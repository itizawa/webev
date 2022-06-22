import { ReactNode } from 'react';

import { WebevNextPage } from '~/libs/interfaces/webevNextPage';

import { DashBoardLayout } from '~/components/common/Layout/DashBoardLayout';
import { MagazinesList } from '~/components/page/Magazine/MagazinesList';

const Index: WebevNextPage = () => {
  return <MagazinesList />;
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Index.getLayout = getLayout;
export default Index;
