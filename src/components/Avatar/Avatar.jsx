import React, {useEffect, useState} from 'react';
import {useUser, useAuth} from 'reactfire';

import MUIAvatar from '@material-ui/core/Avatar';

import {FACEBOOK_AUTH_TOKEN} from '../../constants/facebook';

const Avatar = ({className}) => {
  const user = useUser();
  const auth = useAuth();
  const [userPhoto, setUserPhoto] = useState('');

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

  return <MUIAvatar className={className} src={userPhoto} />;
};

export default Avatar;
