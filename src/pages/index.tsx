import { VFC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import CountUp from 'react-countup';
import axios from 'axios';

import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { useLocale } from '~/hooks/useLocale';
import { imagePath } from '~/const/imagePath';

type Props = {
  count: number;
};

const Index: VFC<Props> = (props) => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead />
      <h1 className="my-3">{t.welcome_webev}</h1>
      <Image src={imagePath.EYE_CATCH_DARK} height={1260} width={2240} />
      <div className="row my-3">
        <div className="col-12 col-md-6 offset-md-3">
          <div className="card bg-dark border border-warning text-white p-3 text-center">
            <h2>
              <CountUp end={props.count} delay={1} /> Pages
            </h2>
            <p>{t.total_pages}</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Link href="/home">
          <button className="btn btn-purple mt-3">{t.start_immediately}</button>
        </Link>
      </div>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getStaticProps() {
  let count = 0;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/v1/pages/all`);
    count = res.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      count,
    },
    revalidate: 300,
  };
}

export default Index;
