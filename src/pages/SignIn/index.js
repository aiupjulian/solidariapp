import React from 'react';
import {useUser, useAuth} from 'reactfire';

import FacebookButton from './components/FacebookButton';

const signOut = (auth) => auth.signOut().then(() => console.log('signed out'));

const UserDetails = ({user}) => {
  const auth = useAuth();

  return (
    <>
      <h3>Displayname: {user.displayName}</h3>
      <h3>Providers:</h3>
      <ul>
        {user.providerData.map((profile) => (
          <li key={profile.providerId}>{profile.providerId}</li>
        ))}
      </ul>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </>
  );
};

const SignInForm = () => {
  return <FacebookButton />;
};

const FirebaseAuthStateButton = () => {
  const user = useUser();
  return user ? <UserDetails user={user} /> : <SignInForm />;
};

const SignIn = () => {
  return (
    <>
      <h1>Ingresar</h1>
      <FirebaseAuthStateButton />
    </>
  );
};

export default SignIn;
