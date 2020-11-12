// ver si se puede traer foto y datos de FB
// puntos de solidaridad
// listado de publicaciones creadas (para editar/borrar/cerrar)
// listado de publicaciones a las que te sumaste (?)
import React from 'react';
import {useUser} from 'reactfire';

const Profile = () => {
  const user = useUser();

  return (
    <>
      <h3>Displayname: {user.displayName}</h3>
      <h3>Providers:</h3>
      <ul>
        {user.providerData.map((profile) => (
          <li key={profile.providerId}>{profile.providerId}</li>
        ))}
      </ul>
    </>
  );
};

export default Profile;
