import React from 'react';
import styled from 'styled-components';

interface TextInputProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputWrapper = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  padding: 0.5em;
`;

const TextInput: React.FC<TextInputProps> = ({
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <InputWrapper
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
