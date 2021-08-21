import { Emoji } from 'emoji-mart';
import { VFC, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { EditableInput } from '../EditableInput';

type Props = {
  onChange: (input: string) => void;
};

export const SearchTextBox: VFC<Props> = (props) => {
  const { onChange } = props;
  const [value, setValue] = useState('');
  const debounceChangeSearchText = useDebouncedCallback(onChange, 300);

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
