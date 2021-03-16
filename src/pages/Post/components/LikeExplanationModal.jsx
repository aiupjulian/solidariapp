import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const UsersLikesModal = ({open, handleClose}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="like-explanation"
    >
      <DialogTitle id="like-explanation">Sumarte a una publicacion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Si te sumás y ayudás en esta publicación, el usuario que la publicó te
          va a poder agradecer y juntos haremos de este mundo uno mejor{' '}
          <EmojiEmotionsIcon fontSize="small" />.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary" disableRipple>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UsersLikesModal;
