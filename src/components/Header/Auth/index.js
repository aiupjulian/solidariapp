import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon, Navbar } from "react-bulma-components";
import * as firebase from "firebase";
import {} from "react-bulma-components";

import "./Auth.css";
import {
  useUserState,
  useUserDispatch,
  userStateObserver,
  signIn,
  signOut
} from "../../../contexts/UserContext";
import pages from "../../../pages";

const Auth = () => {
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
        <Icon size="medium">
          <span className="fas fa-spinner fa-pulse fa-2x" />
        </Icon>
      </Navbar.Item>
    );
  return (
    <>
      {state.displayName ? (
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
            <Navbar.Item renderAs={NavLink} to={pages.Profile.url}>
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
        <Navbar.Item renderAs="div">
          <Button onClick={() => signIn(userDispatch)} color="primary">
            Sign In
          </Button>
        </Navbar.Item>
      )}
    </>
  );
};

export default Auth;
