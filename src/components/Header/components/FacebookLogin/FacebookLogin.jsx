import React from 'react';
import {useAuth} from 'reactfire';

import FacebookButton from '../../../FacebookButton';

const FacebookLogin = ({className}) => {
  const FacebookAuthProvider = useAuth.FacebookAuthProvider;
  const auth = useAuth();
  auth.languageCode = 'es_LA';

  const handleClick = () => {
    const provider = new FacebookAuthProvider();
    auth.signInWithRedirect(provider);
  };

  return (
    <FacebookButton
      className={className}
      onClick={handleClick}
      label="Continuar con Facebook"
    />
  );
};

export default FacebookLogin;
