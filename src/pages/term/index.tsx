import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

import { DefaultLayout } from '~/components/Layout/DefaultLayout';
import { Term } from '~/components/Term/Term';

const Index: VFC = () => {
  const { t } = useTranslation();
  return (
    <DefaultLayout>
      <div className="p-3">
        <h1>{t('term')}</h1>
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
