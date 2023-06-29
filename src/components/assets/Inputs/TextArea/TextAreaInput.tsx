import React from 'react';
import styled from 'styled-components';

interface TextAreaProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const TextAreaWrapper = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  padding: 0.5em;
  width: 100%;
  min-height: 5rem;
  max-height: 20rem;
  resize: vertical;
`;

const TextAreaInput: React.FC<TextAreaProps> = ({
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <TextAreaWrapper
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextAreaInput;
