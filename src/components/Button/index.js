import React from 'react';
import styled, {css} from 'styled-components';

const primary = css`
  background: ${({theme}) => theme.colors.primary};
`;

const secondaryWhite = css`
  background: transparent;
  border: 1px solid white;
`;

const secondary = css`
  color: ${({theme}) => theme.colors.secondary};
  background: transparent;
  border: 1px solid ${({theme}) => theme.colors.secondary};
`;

const variants = {
  primary,
  secondaryWhite,
  secondary,
};

const StyledButton = styled.button`
  color: white;
  padding: ${({theme}) => theme.spacing.md};
  border: none;
  border-radius: 4px;
  min-width: 100px;
  font-size: ${({theme}) => theme.fontSizes.md};
  cursor: pointer;

  :focus {
    outline: 0;
  }

  &:hover {
    box-shadow: 0 7px 16px 0 rgb(0 0 0 / 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  }

  ${({variant}) => variants[variant]};
`;

const Button = ({children, variant = 'primary', ...props}) => {
  return (
    <StyledButton {...props} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;
