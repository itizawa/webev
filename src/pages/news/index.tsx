import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

const Index: VFC = () => {
  const { t } = useLocale();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <h1 className="mb-0">{t.news}</h1>
      </div>
    </div>
  );
};

export default Index;
