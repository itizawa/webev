import { FC } from 'react';
import Link from 'next/link';

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

export default Index;
