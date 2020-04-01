// fb login with firebase https://firebase.google.com/docs/auth/web/facebook-login
// sign in y sign up
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledFirebaseAuth } from "react-firebaseui";

import "./SignIn.css";
import { Spinner } from "../../components";
import firebase from "../../utils/firebase";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  console.log(from.pathname + (from.search || ""));
  return (
    <div className="SignInContainer">
      <h1 className="SignInTitle">Sign in to continue to Solidariapp</h1>
      {isLoading && <Spinner />}
      <StyledFirebaseAuth
        uiConfig={{
          signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
          signInSuccessUrl: from.pathname + (from.search || ""),
          callbacks: {
            uiShown: () => {
              setIsLoading(false);
            },
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
              console.log(redirectUrl);
              return false;
            }
          }
        }}
        firebaseAuth={firebase.auth()}
      />
    </div>
  );
};

export default SignIn;
