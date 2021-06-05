import Head from 'next/head';
import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <Head>
        <title>Webev | {t.inquiry}</title>
      </Head>
      <div className="p-3">
        <h1>{t.inquiry}</h1>
      </div>
    </>
  );
};

export default Index;
