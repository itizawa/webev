import Head from 'next/head';
import { VFC } from 'react';

import { Term } from '~/components/Term/Term';
import { useLocale } from '~/hooks/useLocale';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <Head>
        <title>Webev | {t.term}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <div className="p-3">
        <h1>{t.term}</h1>
        <Term />
      </div>
    </>
  );
};

export default Index;
