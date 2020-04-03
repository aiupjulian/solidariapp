// fb login with firebase https://firebase.google.com/docs/auth/web/facebook-login
// sign in y sign up
import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { StyledFirebaseAuth } from "react-firebaseui";

import "./SignIn.css";
import { Spinner } from "../../components";
import firebase from "../../utils/firebase";

const SignIn = () => {
  const history = useHistory();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (location.state) {
      const { from } = location.state;
      const signInSuccessUrl = from.pathname + (from.search || "");
      sessionStorage.setItem("signInSuccessUrl", signInSuccessUrl);
    }
  }, [location.state]);
  return (
    <div className="SignInContainer">
      <h1 className="SignInTitle">Sign in to continue to Solidariapp</h1>
      {isLoading && <Spinner />}
      <StyledFirebaseAuth
        uiConfig={{
          signInFlow: "redirect",
          signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
          callbacks: {
            uiShown: () => {
              setIsLoading(false);
            },
            signInSuccessWithAuthResult: user => {
              history.push(sessionStorage.getItem("signInSuccessUrl") || "/");
              sessionStorage.removeItem("signInSuccessUrl");
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
