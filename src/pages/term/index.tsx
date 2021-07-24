import { VFC } from 'react';
import { WebevOgpHead } from '~/components/common/WebevOgpHead';

import { Term } from '~/components/domain/Term/molecules/Term';
import { useLocale } from '~/hooks/useLocale';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <>
      <WebevOgpHead title={`Webev | ${t.term}`} />
      <div className="p-3">
        <h1>{t.term}</h1>
        <Term />
      </div>
    </>
  );
};

export default Index;
