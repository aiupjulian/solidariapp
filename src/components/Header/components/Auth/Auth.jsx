import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthCheck, useAuth} from 'reactfire';
import styled from 'styled-components';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import JoinModal from '../JoinModal';
import Avatar from '../../../Avatar';
import routes from '../../../../pages';
import {FACEBOOK_AUTH_TOKEN} from '../../../../constants/facebook';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const showJoinModal = useJoinModalState();
  const setShowJoinModal = useJoinModalSet();

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
          <StyledAvatar />
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
