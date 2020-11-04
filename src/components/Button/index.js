import React from 'react';
import styled, {css} from 'styled-components';

const Button = ({children, variant = 'primary', ...props}) => {
  return (
    <StyledButton {...props} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  padding: ${({theme}) => theme.spacing.md};
  border: none;
  border-radius: 4px;
  min-width: 100px;
  font-size: ${({theme}) => theme.fontSizes.md};
  cursor: pointer;

  &:hover {
    box-shadow: 0 7px 16px 0 rgb(0 0 0 / 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }
  ${({variant}) =>
    variant === 'primary' &&
    css`
      color: white;
      background: ${({theme}) => theme.colors.primary};
    `};
  ${({variant}) =>
    variant === 'secondaryWhite' &&
    css`
      color: white;
      background: transparent;
      border: 1px solid white;
    `};
  ${({variant}) =>
    variant === 'secondary' &&
    css`
      color: ${({theme}) => theme.colors.secondary};
      background: transparent;
      border: 1px solid ${({theme}) => theme.colors.secondary};
    `};
`;
