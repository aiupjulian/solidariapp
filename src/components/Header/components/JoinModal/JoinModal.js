import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';

import FacebookButton from '../FacebookButton';

const FacebookButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${({theme}) => theme.spacing(3)}px;
`;

const JoinModal = ({open, handleClose}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        Ingresar a Solidariapp
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para ingresar a Solidariapp podes utilizar Facebook. Esto te va a
          permitir crear publicaciones y participar en las publicaciones de
          otros usuarios!
        </DialogContentText>
        <FacebookButtonWrapper>
          <FacebookButton />
        </FacebookButtonWrapper>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default JoinModal;
