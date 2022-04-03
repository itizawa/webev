import { Emoji } from 'emoji-mart';
import { VFC, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { usePagePagination } from '@monorepo/client/src/hooks/Page';
import { EditableInput } from '../EditableInput';

export const SearchTextBox: VFC = () => {
  const { setSearchKeyword } = usePagePagination();

  const [value, setValue] = useState('');
  const debounceChangeSearchText = useDebouncedCallback(setSearchKeyword, 300);

  const changeSearchText = (input: string) => {
    setValue(input);
    debounceChangeSearchText(input);
  };

  return (
    <div className="d-flex gap-1 align-items-center">
      <Emoji emoji="mag" size={18} />
      <EditableInput value={value} onChange={changeSearchText} placeholder="Search..." />
    </div>
  );
};
