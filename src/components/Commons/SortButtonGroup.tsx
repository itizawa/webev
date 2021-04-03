import { VFC } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsSortCreatedAt } from '~/stores/page';

export const SortButtonGroup: VFC = () => {
  const { t } = useTranslation();

  const { data: isSortCreatedAt, mutate: mutateIsSortCreatedAt } = useIsSortCreatedAt();

  return (
    <div className="btn-group btn-group-sm" role="group">
      <button className={`btn btn-outline-indigo ${!isSortCreatedAt ? 'active' : ''}`} onClick={() => mutateIsSortCreatedAt(false)}>
        {t('latest_order')}
      </button>
      <button className={`btn btn-outline-indigo ${isSortCreatedAt ? 'active' : ''}`} onClick={() => mutateIsSortCreatedAt(true)}>
        {t('oldest_order')}
      </button>
    </div>
  );
};
