import { Button } from '@nextui-org/react';
import { FC } from 'react';
import { usePagePagination } from '~/hooks/Page';

import { useLocale } from '~/hooks/useLocale';

export const SortButtonGroup: FC = () => {
  const { t } = useLocale();
  const { isSortUpdatedAt, setIsSortUpdatedAt } = usePagePagination();

  return (
    <Button.Group color="secondary" size="sm">
      <Button bordered={isSortUpdatedAt} onClick={() => setIsSortUpdatedAt(false)}>
        {t.latest_order}
      </Button>
      <Button bordered={!isSortUpdatedAt} onClick={() => setIsSortUpdatedAt(true)}>
        {t.oldest_order}
      </Button>
    </Button.Group>
  );
};
