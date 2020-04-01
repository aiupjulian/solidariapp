import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Navbar } from "react-bulma-components";
import firebase from "../../../utils/firebase";

import "./Auth.css";
import { Spinner } from "../../";
import {
  useUserState,
  useUserDispatch,
  userStateObserver,
  signOut
} from "../../../contexts/UserContext";
import pages from "../../../pages";

const Auth = () => {
  const location = useLocation();
  const [dropdownActive, setDropdownActive] = useState(false);
  const state = useUserState();
  const userDispatch = useUserDispatch();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      userStateObserver(userDispatch, user);
    });
  }, [userDispatch]);
  if (state.isLoading)
    return (
      <Navbar.Item renderAs="div">
        <Spinner />
      </Navbar.Item>
    );
  return (
    <>
      {state.isAuthenticated ? (
        <Navbar.Item
          dropdown
          active={dropdownActive}
          onMouseEnter={() => setDropdownActive(true)}
          onMouseLeave={() => setDropdownActive(false)}
        >
          <Navbar.Link renderAs="div" className="userDropdown">
            {state.photoURL && (
              <img src={state.photoURL} alt="User" className="userPhoto" />
            )}
            <span className="userName">{state.displayName}</span>
          </Navbar.Link>
          <Navbar.Dropdown boxed>
            <Navbar.Item renderAs={NavLink} to={pages.Profile.path}>
              {pages.Profile.name}
            </Navbar.Item>
            <Navbar.Item renderAs="div">
              <Button onClick={() => signOut(userDispatch)} color="primary">
                Sign Out
              </Button>
            </Navbar.Item>
          </Navbar.Dropdown>
        </Navbar.Item>
      ) : (
        <Navbar.Item
          renderAs={NavLink}
          to={{
            pathname: pages.SignIn.path,
            state: { from: location }
          }}
        >
          <Button color="primary">{pages.SignIn.name}</Button>
        </Navbar.Item>
      )}
    </>
  );
};

export default Auth;
