import { VFC } from 'react';

import { DefaultLayout } from '~/components/Layout/DefaultLayout';
import { Term } from '~/components/Term/Term';
import { useLocale } from '~/hooks/useLocale';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <DefaultLayout>
      <div className="p-3">
        <h1>{t.term}</h1>
        <Term />
      </div>
    </DefaultLayout>
  );
};

export default Index;
