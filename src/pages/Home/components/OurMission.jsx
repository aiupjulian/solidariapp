import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import {Love} from '../../../assets/icons';

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({theme}) => theme.spacing(4)}px;
  margin-bottom: ${({theme}) => theme.spacing(4)}px;
  ${({theme}) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 2;
  ${({theme}) => theme.breakpoints.up('sm')} {
    margin-right: ${({theme}) => theme.spacing(8)}px;
  }
`;

const StyledLove = styled(Love)`
  flex: 1;
  height: auto;
  width: 100%;
`;

const OurMision = () => (
  <Section>
    <Content>
      <Typography variant="h2" gutterBottom>
        ¡Bienvenido a Solidariapp!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Somos una red social solidaria, donde vas a poder ofrecer o pedir ayuda.
        Podes crear o buscar publicaciones dentro de las categorias que tenemos
        disponibles.
      </Typography>
    </Content>
    <Hidden smDown>
      <StyledLove />
    </Hidden>
  </Section>
);

export default OurMision;
