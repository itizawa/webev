import { Emoji } from 'emoji-mart';
import { useState, FC } from 'react';
import { EditableInput } from '../EditableInput';
import { usePagePagination } from '~/hooks/Page';
import { useDebouncedCallback } from '~/hooks/shared';

export const SearchTextBox: FC = () => {
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
