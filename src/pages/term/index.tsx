import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { VFC } from 'react';

import { DefaultLayout } from '~/components/Layout/DefaultLayout';
import { Term } from '~/components/Term/Term';

const Index: VFC = () => {
  return (
    <DefaultLayout>
      <div className="p-3">
        <h1>利用規約</h1>
        <Term />
      </div>
    </DefaultLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Index;
