import { useEffect, useState, VFC } from 'react';

import styled from 'styled-components';

type Props = {
  value: string;
  onSubmit: (inputValue: string) => void;
};

export const EditableInput: VFC<Props> = (props) => {
  const { value, onSubmit } = props;
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

    onSubmit(inputValue);
  };

  return (
    <StyledInput
      className="form-control text-nowrap overflow-scroll fs-1 pt-0 pb-2 pb-md-0 me-auto w-100"
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={handleKeyPress}
      value={inputValue || ''}
    />
  );
};

const StyledInput = styled.input`
  color: #ccc;
  background: transparent;
  border: none;

  &:hover {
    color: #ccc;
    background: #232323;
    ::placeholder {
      color: #ccc;
    }
  }

  &:focus {
    color: #ccc;
    background: transparent;
    ::placeholder {
      color: #ccc;
    }
  }
`;
