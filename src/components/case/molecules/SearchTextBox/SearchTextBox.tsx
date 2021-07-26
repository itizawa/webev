import { Emoji } from 'emoji-mart';
import { VFC } from 'react';
import { EditableInput } from '../EditableInput';

type Props = {
  onChange: (input: string) => void;
};

export const SearchTextBox: VFC<Props> = (props) => {
  const { onChange } = props;
  return (
    <div className="d-flex gap-1 align-items-center">
      <Emoji emoji="mag" size={18} />
      <EditableInput onChange={onChange} placeholder="Search..." isAllowEmpty />
    </div>
  );
};
