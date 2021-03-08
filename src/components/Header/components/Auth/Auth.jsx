import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {AuthCheck, useAuth, useUser, useStorage} from 'reactfire';
import styled from 'styled-components';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import JoinModal from '../JoinModal';
import routes from '../../../../pages';
import {
  useJoinModalSet,
  useJoinModalState,
} from '../../../../contexts/JoinModalContext';

const StyledIconButton = styled(IconButton)`
  padding-top: 0;
  padding-bottom: 0;
`;

const StyledAvatar = styled(Avatar)`
  width: ${({theme}) => theme.spacing(4)}px;
  height: ${({theme}) => theme.spacing(4)}px;
`;

const Auth = () => {
  const auth = useAuth();
  const user = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const showJoinModal = useJoinModalState();
  const setShowJoinModal = useJoinModalSet();
  const storage = useStorage();

  useEffect(() => {
    const fetchUserPhotoURL = (photoURL, accessToken) =>
      fetch(`${photoURL}?access_token=${accessToken}&height=200&width=200`)
        .then((response) => {
          if (!response.ok) return Promise.reject();
          return response.blob();
        })
        .then((imageBlob) => {
          const imageFile = new File([imageBlob], 'name');
          const imagePath = `users/${user.uid}`;
          return storage
            .ref(imagePath)
            .put(imageFile)
            .then((imageSnapshot) =>
              imageSnapshot.ref
                .getDownloadURL()
                .then((url) => user.updateProfile({photoURL: url})),
            );
        });
    auth.getRedirectResult().then(function (result) {
      if (result.credential) {
        fetchUserPhotoURL(result.user.photoURL, result.credential.accessToken);
      }
    });
  }, [auth, user, storage]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    auth.signOut();
  };

  const handleJoinModalOpen = () => {
    setShowJoinModal(true);
  };

  const handleJoinModalClose = () => {
    setShowJoinModal(false);
  };

  return (
    <AuthCheck
      fallback={
        <>
          <Button
            variant="contained"
            onClick={handleJoinModalOpen}
            disableRipple
          >
            Ingresar
          </Button>
          <JoinModal open={showJoinModal} handleClose={handleJoinModalClose} />
        </>
      }
    >
      <div>
        <StyledIconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <StyledAvatar src={user?.photoURL} />
        </StyledIconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            component={Link}
            to={routes.Profile.path}
            onClick={handleClose}
          >
            {routes.Profile.name}
          </MenuItem>
          <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
        </Menu>
      </div>
    </AuthCheck>
  );
};

export default Auth;
