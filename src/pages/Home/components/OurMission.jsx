import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useUser} from 'reactfire';

import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {Love} from '../../../assets/icons';
import pages from '../../';
import {useJoinModalSet} from '../../../contexts/JoinModalContext';
import {useMemo} from 'react';

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

const ActionsContainer = styled(Paper)`
  margin-top: ${({theme}) => theme.spacing(5)}px;
  display: flex;
  ${({theme}) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const ActionContainer = styled(Box)`
  padding: ${({theme}) => theme.spacing(3)}px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLove = styled(Love)`
  flex: 1;
  height: auto;
  width: 100%;
`;

const OurMision = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const setShowJoinModal = useJoinModalSet();
  const user = useUser();

  const createPostProps = useMemo(
    () =>
      user
        ? {component: Link, to: pages.PostCreate.path}
        : {onClick: () => setShowJoinModal(true)},
    [user, setShowJoinModal],
  );

  return (
    <Section>
      <Content>
        <Typography variant="h2" gutterBottom>
          ¡Bienvenido a Solidariapp!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Somos una red social solidaria, donde vas a poder ofrecer o pedir
          ayuda. Podes crear o buscar publicaciones dentro de las categorias que
          tenemos disponibles.
        </Typography>
        <ActionsContainer elevation={1}>
          <ActionContainer>
            <Typography variant="h5" gutterBottom>
              ¿Querés ayudar?
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              component={Link}
              to={pages.PostList.path}
            >
              Ver publicaciones
            </Button>
          </ActionContainer>
          <Divider
            flexItem={!isMobile}
            orientation={isMobile ? 'horizontal' : 'vertical'}
          />
          <ActionContainer>
            <Typography variant="h5" gutterBottom>
              ¿Necesitás ayuda?
            </Typography>
            <Button
              variant="contained"
              size="large"
              color="primary"
              {...createPostProps}
            >
              Crear publicación
            </Button>
          </ActionContainer>
        </ActionsContainer>
      </Content>
      <Hidden smDown>
        <StyledLove />
      </Hidden>
    </Section>
  );
};

export default OurMision;
