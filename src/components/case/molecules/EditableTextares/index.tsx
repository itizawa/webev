import { useEffect, useState, VFC } from 'react';

import styled from 'styled-components';

type Props = {
  value: string;
  onBlur: (inputValue: string) => void;
  isHeader?: boolean;
  isAllowEmpty?: boolean;
  placeholder?: string;
};

export const EditableTextares: VFC<Props> = (props) => {
  const { value, onBlur, isHeader, isAllowEmpty = false, placeholder } = props;
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleKeyPress = (): void => {
    if (!isAllowEmpty && inputValue?.trim() === '') {
      return;
    }
    // do nothing, no change
    if (inputValue === value) {
      return;
    }
    onBlur(inputValue);
  };

  return (
    <StyledInput
      className={`form-control text-white text-nowrap overflow-scroll ${isHeader ? 'fs-1' : ''} pb-md-0 w-100`}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleKeyPress}
      value={inputValue || ''}
      placeholder={placeholder || ''}
    />
  );
};

const StyledInput = styled.textarea`
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
