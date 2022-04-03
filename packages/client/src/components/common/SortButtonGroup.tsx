import { VFC } from 'react';
import { usePagePagination } from '@monorepo/webev-client/src/hooks/Page';

import { useLocale } from '@monorepo/webev-client/src/hooks/useLocale';

export const SortButtonGroup: VFC = () => {
  const { t } = useLocale();
  const { isSortUpdatedAt, setIsSortUpdatedAt } = usePagePagination();

  return (
    <div className="btn-group btn-group-sm" role="group">
      <button
        className={`btn btn-outline-primary text-white text-nowrap ${!isSortUpdatedAt ? 'active' : ''}`}
        onClick={() => setIsSortUpdatedAt(false)}
      >
        {t.latest_order}
      </button>
      <button
        className={`btn btn-outline-primary text-white text-nowrap ${isSortUpdatedAt ? 'active' : ''}`}
        onClick={() => setIsSortUpdatedAt(true)}
      >
        {t.oldest_order}
      </button>
    </div>
  );
};
