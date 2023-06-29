import React from 'react';
import styled from 'styled-components';

interface SearchFieldProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size: string;
}

const StyledInput = styled.input`
  padding: 1em;
  color: black;
  background: #f2f2f2;
  border: none;
  border-radius: 3px;
`;

export function SearchInput({ onChange, size }: SearchFieldProps) {
  return (
    <StyledInput
      type="text"
      placeholder="Search..."
      style={{ width: size }}
      onChange={onChange}
    />
  );
}
