import { FC } from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/client';

const Index: FC = () => {
  return (
    <div className="p-3">
      <h1>Welcome Webev!!</h1>
      <h2>
        <Link href="/home">Go to Home</Link>
      </h2>
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types */
export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  return { props: { session } };
};

export default Index;
