import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DefaultLayout } from '~/components/Layout/DefaultLayout';

const Index: FC = () => {
  return (
    <DefaultLayout>
      <h1 className="my-3">Welcome Webev!!</h1>
      <Image src="/images/eye-catch.png" height={1260} width={2240} />
      <div className="text-center">
        <Link href="/home">
          <button className="btn btn-info text-white mt-3">さっそく 始める</button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

export default Index;
