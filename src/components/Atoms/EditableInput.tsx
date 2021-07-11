import { useEffect, useState, VFC } from 'react';

import styled from 'styled-components';

type Props = {
  value: string;
  onSubmit: (inputValue: string) => void;
  isHeader?: boolean;
  isAllowEmpty?: boolean;
  placeholder?: string;
};

export const EditableInput: VFC<Props> = (props) => {
  const { value, onSubmit, isHeader, isAllowEmpty = false, placeholder } = props;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key != 'Enter') {
      return;
    }
    if (!isAllowEmpty && inputValue?.trim() === '') {
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
      className={`form-control text-white text-nowrap overflow-scroll ${isHeader ? 'fs-1' : ''} py-0 pb-md-0 w-100`}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={handleKeyPress}
      value={inputValue || ''}
      placeholder={placeholder || ''}
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
