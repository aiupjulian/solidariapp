// ver si se puede traer foto y datos de FB
// puntos de solidaridad
// listado de publicaciones creadas (para editar/borrar/cerrar)
// listado de publicaciones a las que te sumaste (?)
import React from 'react';
import {useUser} from 'reactfire';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

const UserData = styled(Paper)``;

const StyledAvatar = styled(Avatar)`
  width: ${({theme}) => theme.spacing(12)}px;
  height: ${({theme}) => theme.spacing(12)}px;
`;

// TODO: show user profile and posts to edit/close
const Profile = () => {
  const user = useUser();
  console.log(user);

  return (
    <>
      <UserData>
        <StyledAvatar src={user.photoURL} />
        <h3>Displayname: {user.displayName}</h3>
        <h3>Providers:</h3>
        <ul>
          {user.providerData.map((profile) => (
            <li key={profile.providerId}>{profile.providerId}</li>
          ))}
        </ul>
      </UserData>
      <Paper>
        <h2>Publicaciones del usuario:</h2>
      </Paper>
    </>
  );
};

export default Profile;
