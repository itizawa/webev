import { VFC } from 'react';

import { useLocale } from '~/hooks/useLocale';

type Props = {
  isSortCreatedAt: boolean;
  onClickSortButton: (bool: boolean) => void;
};

export const SortButtonGroup: VFC<Props> = ({ isSortCreatedAt, onClickSortButton }) => {
  const { t } = useLocale();

  return (
    <div className="btn-group btn-group-sm" role="group">
      <button
        className={`btn btn-outline-primary text-white text-nowrap ${!isSortCreatedAt ? 'active' : ''}`}
        onClick={() => onClickSortButton(false)}
      >
        {t.latest_order}
      </button>
      <button
        className={`btn btn-outline-primary text-white text-nowrap ${isSortCreatedAt ? 'active' : ''}`}
        onClick={() => onClickSortButton(true)}
      >
        {t.oldest_order}
      </button>
    </div>
  );
};
