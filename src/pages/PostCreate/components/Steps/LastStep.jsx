import React from 'react';
import styled from 'styled-components';

import CircularProgress from '@material-ui/core/CircularProgress';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({theme}) => theme.spacing(4)}px 0;
`;

const LoadingText = styled.span`
  margin-top: ${({theme}) => theme.spacing(3)}px;
`;

const LastStep = () => (
  <Container>
    <CircularProgress />
    <LoadingText>Creando publicacion...</LoadingText>
  </Container>
);

export default LastStep;
