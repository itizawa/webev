import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from '~/components/Layout/DefaultLayout';
import { restClient } from '~/utils/rest-client';

type Props = {
  count: number;
};

const Index: ReactNode = (props: Props) => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <h1 className="my-3">{t('welcome_webev')}</h1>
      <Image src="/images/eye-catch-dark.png" height={1260} width={2240} />
      <div className="row my-3">
        <div className="card bg-dark border border-warning text-white p-3 col-6 offset-3 text-center">
          <h2>
            <CountUp end={props.count} delay={1} /> Pages
          </h2>
          <p>{t('total_pages')}</p>
        </div>
      </div>
      <div className="text-center">
        <Link href="/home">
          <button className="btn btn-purple mt-3">{t('start_immediately')}</button>
        </Link>
      </div>
    </DefaultLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async ({ locale }: { locale: string }) => {
  const res = await restClient.apiGet('/pages/all');
  const count = res.data;

  return {
    props: {
      count,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
