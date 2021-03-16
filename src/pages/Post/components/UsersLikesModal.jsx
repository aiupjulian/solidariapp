import React from 'react';
import styled from 'styled-components';
import {useFirestore} from 'reactfire';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const UserName = styled(ListItemText)`
  margin-right: ${({theme}) => theme.spacing(18)}px;
  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ${({theme}) => theme.breakpoints.down('sm')} {
    margin-right: ${({theme}) => theme.spacing(10)}px;
  }
`;

const UsersLikesModal = ({open, handleClose, likes, postRef}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const firestore = useFirestore();

  const hasThankedUser = (userUid) =>
    likes.users.find((user) => user.uid === userUid).thanked;

  const handleThankClick = (userUid) => {
    const newUsersLikes = [...likes.users];
    const userIndex = newUsersLikes.findIndex((user) => user.uid === userUid);
    const newUserThanked = !newUsersLikes[userIndex].thanked;
    newUsersLikes[userIndex] = {
      ...newUsersLikes[userIndex],
      thanked: newUserThanked,
    };
    postRef.update({'likes.users': newUsersLikes});
    firestore.runTransaction(async (t) => {
      const acknowledgementsRef = firestore
        .collection('acknowledgements')
        .doc(userUid);
      const doc = await t.get(acknowledgementsRef);
      if (doc.data() === undefined) {
        const {thanked, ...user} = newUsersLikes[userIndex];
        firestore
          .collection('acknowledgements')
          .doc(userUid)
          .set({...user, acknowledgements: 1});
      } else {
        const newPopulation = newUserThanked
          ? doc.data().acknowledgements + 1
          : doc.data().acknowledgements - 1;
        t.update(acknowledgementsRef, {acknowledgements: newPopulation});
      }
    });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="thank-users"
    >
      <DialogTitle id="thank-users">Agradecer a usuarios</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Podes agradecer a los usuarios que colaboraron con tu publicacion.
        </DialogContentText>
        {likes.users.length ? (
          <List>
            {likes.users.map((user) => (
              <ListItem key={user.uid} disableGutters={fullScreen}>
                <ListItemAvatar>
                  <Avatar src={user.photoURL} />
                </ListItemAvatar>
                <UserName primary={user.displayName} />
                <ListItemSecondaryAction>
                  <Button
                    disableRipple
                    variant={
                      hasThankedUser(user.uid) ? 'contained' : 'outlined'
                    }
                    color="primary"
                    onClick={() => handleThankClick(user.uid)}
                  >
                    {hasThankedUser(user.uid) ? 'Agradecido' : 'Agradecer'}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <DialogContentText>
            Todavia no hay usuarios sumados a esta publicacion.
          </DialogContentText>
        )}
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
