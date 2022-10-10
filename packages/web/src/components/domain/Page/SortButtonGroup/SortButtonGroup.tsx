import { Button, Dropdown, Text } from '@nextui-org/react';
import { useState, FC, Key, useCallback } from 'react';
import { Icon } from '~/components/base/atoms/Icon';
import { usePagePagination } from '~/hooks/Page';

import { useLocale } from '~/hooks/useLocale';

type SelectedKey = 'latest_order' | 'oldest_order';

export const SortButtonGroup: FC = () => {
  const { t } = useLocale();
  const { isSortCreatedAt, setIsSortCreatedAt } = usePagePagination();
  const [selected, setSelected] = useState<SelectedKey>(isSortCreatedAt ? 'oldest_order' : 'latest_order');

  const handleAction = useCallback(
    (key: Key) => {
      setSelected(key as SelectedKey);
      switch (key) {
        case 'latest_order':
          setIsSortCreatedAt(false);
          break;
        case 'oldest_order':
          setIsSortCreatedAt(true);
          break;
      }
    },
    [setIsSortCreatedAt],
  );

  return (
    <Dropdown placement="bottom-right">
      <Dropdown.Trigger>
        <Button auto css={{ padding: '0px 11px' }} light icon={<Icon width={18} height={18} icon="SORT" />}>
          <Text>{t[selected]}</Text>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu selectionMode="single" aria-label="Static Actions" onAction={handleAction} selectedKeys={[selected]}>
        <Dropdown.Section title="Sort">
          <Dropdown.Item key="latest_order">{t.latest_order}</Dropdown.Item>
          <Dropdown.Item key="oldest_order">{t.oldest_order}</Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
};
