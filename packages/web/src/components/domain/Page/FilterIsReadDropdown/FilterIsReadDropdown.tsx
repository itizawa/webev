import { Button, Dropdown, Text } from '@nextui-org/react';
import { FC, Key, useCallback } from 'react';
import { Icon } from '@webev/web/components/base/atoms/Icon';
import { usePagePagination } from '@webev/web/hooks/Page';

import { useLocale } from '@webev/web/hooks/useLocale';

export const FilterIsReadDropdown: FC = () => {
  const { t } = useLocale();
  const { isRead, setIsRead } = usePagePagination();

  const handleAction = useCallback(
    (key: Key) => {
      if (key === 'is_read') {
        return setIsRead((prevState) => (prevState === undefined ? true : prevState ? undefined : true));
      }
      if (key === 'is_not_read') {
        return setIsRead((prevState) => (prevState === undefined ? false : prevState ? false : undefined));
      }
    },
    [setIsRead],
  );

  return (
    <Dropdown placement="bottom-right">
      <Dropdown.Trigger>
        <Button auto css={{ padding: '0px 11px' }} light icon={<Icon width={18} height={18} icon="FILTER" />}>
          <Text>{isRead === undefined ? t.filter : isRead ? t.is_read : t.is_not_read}</Text>
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu
        selectionMode="single"
        aria-label="Static Actions"
        onAction={handleAction}
        selectedKeys={isRead === undefined ? undefined : isRead ? ['is_read'] : ['is_not_read']}
      >
        <Dropdown.Section title="Filter">
          <Dropdown.Item key="is_read">{t.is_read}</Dropdown.Item>
          <Dropdown.Item key="is_not_read">{t.is_not_read}</Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
};
