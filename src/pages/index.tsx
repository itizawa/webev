import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DefaultLayout } from '~/components/Layout/DefaultLayout';

const Index: FC = () => {
  return (
    <DefaultLayout>
      <div className="p-3">
        <h1>Welcome Webev!!</h1>
        <Image src="/images/eye-catch.png" height={1260} width={2240} />
        <h2>
          <Link href="/home">Go to Home</Link>
        </h2>
      </div>
    </DefaultLayout>
  );
};

export default Index;
