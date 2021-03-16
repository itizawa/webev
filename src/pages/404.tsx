import { FC } from 'react';
import Link from 'next/link';

import { DefaultLayout } from '~/components/Layout/DefaultLayout';

const Page: FC = () => {
  return (
    <DefaultLayout>
      <div className="p-3">
        <h1 className="m-3">This is the 404 page</h1>
        <h2>
          <Link href="/home">Go to Home</Link>
        </h2>
      </div>
    </DefaultLayout>
  );
};

export default Page;
