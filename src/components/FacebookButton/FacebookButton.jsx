import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 20px;
  background: #1a77f2;
  cursor: pointer;
`;

const Logo = styled.img`
  margin: 8px 8px 8px 12px;
  height: 24px;
`;

const Text = styled.span`
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  margin-right: 12px;
`;

const FacebookButton = ({label, ...restProps}) => (
  <ButtonContainer role="button" {...restProps}>
    <Logo
      src="https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/OF6ddsGKpeB.png"
      alt="Facebook"
      width="24"
      height="24"
    />
    <Text>{label}</Text>
  </ButtonContainer>
);

export default FacebookButton;
