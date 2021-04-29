import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

export const NoPageAlert: VFC = () => {
  const { t } = useLocale();

  return (
    <div className="text-center alert alert-info">
      <h2 className="mb-0">{t['your_pages_don’t_exist']}</h2>
    </div>
  );
};
