import { VFC } from 'react';

import styled from 'styled-components';

type Props = {
  value?: string;
  onChange: (inputValue: string) => void;
  isHeader?: boolean;
  placeholder?: string;
};

export const EditableTextarea: VFC<Props> = (props) => {
  const { value, onChange, isHeader, placeholder } = props;

  return (
    <StyledInput
      className={`form-control text-white text-nowrap overflow-scroll ${isHeader ? 'fs-1' : ''} pb-md-0 w-100`}
      onChange={(e) => onChange(e.target.value)}
      value={value || ''}
      placeholder={placeholder || ''}
    />
  );
};

const StyledInput = styled.textarea`
  background: transparent;
  border: none;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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
