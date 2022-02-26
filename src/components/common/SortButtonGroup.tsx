import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';
import { useIsSortCreatedAt } from '~/stores/page';

export const SortButtonGroup: VFC = () => {
  const { t } = useLocale();

  const { data: isSortCreatedAt, mutate: mutateIsSortCreatedAt } = useIsSortCreatedAt();

  return (
    <div className="btn-group btn-group-sm" role="group">
      <button
        className={`btn btn-outline-primary text-white text-nowrap ${!isSortCreatedAt ? 'active' : ''}`}
        onClick={() => mutateIsSortCreatedAt(false)}
      >
        {t.latest_order}
      </button>
      <button
        className={`btn btn-outline-primary text-white text-nowrap ${isSortCreatedAt ? 'active' : ''}`}
        onClick={() => mutateIsSortCreatedAt(true)}
      >
        {t.oldest_order}
      </button>
    </div>
  );
};
