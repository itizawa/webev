import { FC } from 'react';
import { Input } from '@nextui-org/react';
import { usePagePagination } from '~/hooks/Page';
import { useDebouncedCallback } from '~/hooks/shared';

export const SearchTextBox: FC = () => {
  const { setSearchKeyword } = usePagePagination();

  const debounceChangeSearchText = useDebouncedCallback(setSearchKeyword, 300);

  const changeSearchText = (input: string) => {
    debounceChangeSearchText(input);
  };

  return <Input onChange={(e) => changeSearchText(e.target.value)} contentLeft="🔍" placeholder="Search..." underlined clearable />;
};
