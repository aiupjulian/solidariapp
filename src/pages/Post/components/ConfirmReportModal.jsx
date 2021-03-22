import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';

const UsersLikesModal = ({open, handleClose, handleConfirm}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="report-explanation"
    >
      <DialogTitle id="report-explanation">
        Reportar publicacion indebida?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Esta publicacion se reportará a los adminsitradores que van a decidir
          que hacer con ella.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary" disableRipple>
          Cerrar
        </Button>
        <Button autoFocus onClick={handleConfirm} color="primary" disableRipple>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsersLikesModal;
