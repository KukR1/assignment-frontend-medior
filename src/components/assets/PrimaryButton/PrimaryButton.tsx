import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  variant: 'primary' | 'secondary' | 'success' | 'danger';
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
}

const ButtonWrapper = styled.button<ButtonProps>`
  padding: 0.5em 1em;
  border-radius: 3px;
  font-size: 1em;
  cursor: pointer;
  border: none;

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return css`
          background: #0e54b0;
          color: white;
        `;
      case 'secondary':
        return css`
          background: #6c757d;
          color: white;
        `;
      case 'success':
        return css`
          background: #28a745;
          color: white;
        `;
      case 'danger':
        return css`
          background: #ff0000;
          color: white;
        `;
      default:
        return css`
          background: #007bff;
          color: white;
        `;
    }
  }}
`;

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  onClick,
}) => {
  return (
    <ButtonWrapper type={type} variant={variant} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

export default PrimaryButton;
