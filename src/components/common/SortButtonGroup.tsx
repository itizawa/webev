import { VFC } from 'react';
import { usePagePagination } from '~/hooks/Page';

import { useLocale } from '~/hooks/useLocale';

export const SortButtonGroup: VFC = () => {
  const { t } = useLocale();
  const { isSortCreatedAt, setIsSortCreatedAt } = usePagePagination();

  return (
    <div className="btn-group btn-group-sm" role="group">
      <button
        className={`btn btn-outline-primary text-white text-nowrap ${!isSortCreatedAt ? 'active' : ''}`}
        onClick={() => setIsSortCreatedAt(false)}
      >
        {t.latest_order}
      </button>
      <button
        className={`btn btn-outline-primary text-white text-nowrap ${isSortCreatedAt ? 'active' : ''}`}
        onClick={() => setIsSortCreatedAt(true)}
      >
        {t.oldest_order}
      </button>
    </div>
  );
};
