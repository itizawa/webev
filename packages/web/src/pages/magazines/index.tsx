import { ReactNode } from 'react';

import { WebevNextPage } from '@webev/web/libs/interfaces/webevNextPage';

import { DashBoardLayout } from '@webev/web/components/common/Layout/DashBoardLayout';
import { MagazinesList } from '@webev/web/components/page/Magazine/MagazinesList';

const Index: WebevNextPage = () => {
  return <MagazinesList />;
};

const getLayout = (page: ReactNode) => <DashBoardLayout>{page}</DashBoardLayout>;

Index.getLayout = getLayout;
export default Index;
