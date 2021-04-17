import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import CountUp from 'react-countup';
import axios from 'axios';

import { DefaultLayout } from '~/components/Layout/DefaultLayout';
import { useLocale } from '~/hooks/useLocale';

type Props = {
  count: number;
};

const Index: ReactNode = (props: Props) => {
  const { t } = useLocale();

  return (
    <DefaultLayout>
      <h1 className="my-3">{t.welcome_webev}</h1>
      <Image src="/images/eye-catch-dark.png" height={1260} width={2240} />
      <div className="row my-3">
        <div className="card bg-dark border border-warning text-white p-3 col-6 offset-3 text-center">
          <h2>
            <CountUp end={props.count} delay={1} /> Pages
          </h2>
          <p>{t.total_pages}</p>
        </div>
      </div>
      <div className="text-center">
        <Link href="/home">
          <button className="btn btn-purple mt-3">{t.start_immediately}</button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/v1/pages/all`);
  const count = res.data;

  return {
    props: {
      count,
      revalidate: 300,
    },
  };
};

export default Index;
