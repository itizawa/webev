import { VFC } from 'react';
import { useIsSortCreatedAt } from '~/stores/page';

export const SortButtonGroup: VFC = () => {
  const { data: isSortCreatedAt, mutate: mutateIsSortCreatedAt } = useIsSortCreatedAt();

  return (
    <div className="btn-group btn-group-sm" role="group">
      <button className={`btn btn-outline-indigo ${!isSortCreatedAt ? 'active' : ''}`} onClick={() => mutateIsSortCreatedAt(false)}>
        新しい順番
      </button>
      <button className={`btn btn-outline-indigo ${isSortCreatedAt ? 'active' : ''}`} onClick={() => mutateIsSortCreatedAt(true)}>
        古い順番
      </button>
    </div>
  );
};
