import { useEffect, useState, VFC } from 'react';

import styled from 'styled-components';

type Props = {
  value: string;
  onSubmit: (inputValue: string) => void;
  isHeader?: boolean;
};

export const EditableInput: VFC<Props> = (props) => {
  const { value, onSubmit, isHeader } = props;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key != 'Enter') {
      return;
    }
    // name is required
    if (inputValue?.trim() === '') {
      return;
    }
    // do nothing, no change
    if (inputValue === value) {
      return;
    }
    e.currentTarget.blur();
    onSubmit(inputValue);
  };

  return (
    <StyledInput
      className={`form-control text-white text-nowrap overflow-scroll ${isHeader ? 'fs-1' : ''} pt-0 pb-2 pb-md-0 w-100`}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={handleKeyPress}
      value={inputValue || ''}
    />
  );
};

const StyledInput = styled.input`
  background: transparent;
  border: none;

  &:hover {
    background: #232323;
    ::placeholder {
      color: #ccc;
    }
  }

  &:focus {
    background: transparent;
    ::placeholder {
      color: #ccc;
    }
  }
`;
