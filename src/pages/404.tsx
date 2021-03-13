import { FC } from 'react';
import Link from 'next/link';

import { DashBoardLayout } from '~/components/Layout/DashBoardLayout';

const Page: FC = () => {
  return (
    <DashBoardLayout>
      <div className="p-3">
        <h1 className="m-3">This is the 404 page</h1>
        <h2>
          <Link href="/home">Go to Home</Link>
        </h2>
      </div>
    </DashBoardLayout>
  );
};

export default Page;
