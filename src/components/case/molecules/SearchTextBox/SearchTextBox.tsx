import { Emoji } from 'emoji-mart';
import { VFC } from 'react';
import { EditableInput } from '../EditableInput';

type Props = {
  onChange: (input: string) => void;
  value: string;
  placeholder?: string;
};

export const SearchTextBox: VFC<Props> = (props) => {
  const { onChange, value, placeholder } = props;
  return (
    <div className="d-flex gap-1 align-items-center mb-3">
      <Emoji emoji="mag" size={18} />
      <EditableInput onChange={onChange} value={value} placeholder={placeholder} isAllowEmpty />
    </div>
  );
};
