import { useEffect, useState, VFC } from 'react';

import styled from 'styled-components';
import { useDebounce } from '~/hooks/useDebounce';

type Props = {
  value: string;
  onChange: (inputValue: string) => void;
  isHeader?: boolean;
  isAllowEmpty?: boolean;
  placeholder?: string;
};

export const EditableInput: VFC<Props> = (props) => {
  const { value, onChange, isHeader, isAllowEmpty = false, placeholder } = props;
  const [inputValue, setInputValue] = useState(value);
  const { debouncedValue } = useDebounce({ value: inputValue, delay: 300 });

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!isAllowEmpty && debouncedValue?.trim() === '') {
      return;
    }
    // do nothing, no change
    if (debouncedValue === value) {
      return;
    }
    onChange(debouncedValue);
  }, [debouncedValue]);

  return (
    <StyledInput
      className={`form-control text-white text-nowrap overflow-scroll ${isHeader ? 'fs-1' : ''} py-0 pb-md-0 w-100`}
      onChange={(e) => setInputValue(e.target.value)}
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
