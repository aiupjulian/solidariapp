import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthCheck, useUser, useAuth} from 'reactfire';
import styled from 'styled-components';

import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import JoinModal from '../JoinModal';
import routes from '../../../../pages';

const StyledIconButton = styled(IconButton)`
  padding-top: 0;
  padding-bottom: 0;
`;

const StyledAvatar = styled(Avatar)`
  width: ${({theme}) => theme.spacing(4)}px;
  height: ${({theme}) => theme.spacing(4)}px;
`;

const FACEBOOK_AUTH_TOKEN = 'FBAT';

const Auth = () => {
  const user = useUser();
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userPhoto, setUserPhoto] = useState('');
  const open = Boolean(anchorEl);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserPhotoURL = (photoURL, accessToken) =>
      fetch(`${photoURL}?access_token=${accessToken}`).then(({url}) =>
        setUserPhoto(url),
      );
    auth.getRedirectResult().then(function (result) {
      if (result.credential) {
        localStorage.setItem(
          FACEBOOK_AUTH_TOKEN,
          result.credential.accessToken,
        );
        fetchUserPhotoURL(result.user.photoURL, result.credential.accessToken);
      } else {
        const accessToken = localStorage.getItem(FACEBOOK_AUTH_TOKEN);
        if (accessToken) fetchUserPhotoURL(user.photoURL, accessToken);
      }
    });
  }, [auth, user]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem(FACEBOOK_AUTH_TOKEN);
    auth.signOut();
  };

  const handleJoinModalOpen = () => {
    setJoinModalOpen(true);
  };

  const handleJoinModalClose = () => {
    setJoinModalOpen(false);
  };

  return (
    <AuthCheck
      fallback={
        <>
          <Button variant="contained" onClick={handleJoinModalOpen}>
            Ingresar
          </Button>
          <JoinModal open={joinModalOpen} handleClose={handleJoinModalClose} />
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
          <StyledAvatar src={userPhoto} />
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
