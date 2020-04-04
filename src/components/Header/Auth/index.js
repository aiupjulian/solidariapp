import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
  const [dropdownActive, setDropdownActive] = useState(false);
  const user = useUserState();
  const userDispatch = useUserDispatch();
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      userStateObserver(userDispatch, user);
    });
    return unregisterAuthObserver;
  }, [userDispatch]);
  if (user.isLoading)
    return (
      <Navbar.Item renderAs="div">
        <Spinner />
      </Navbar.Item>
    );
  return (
    <>
      {user.isAuthenticated ? (
        <Navbar.Item
          dropdown
          active={dropdownActive}
          onMouseEnter={() => setDropdownActive(true)}
          onMouseLeave={() => setDropdownActive(false)}
        >
          <Navbar.Link renderAs="div" className="userDropdown">
            {user.photoURL && (
              <img src={user.photoURL} alt="User" className="userPhoto" />
            )}
            <span className="userName">{user.displayName}</span>
          </Navbar.Link>
          <Navbar.Dropdown boxed>
            <Navbar.Item renderAs={NavLink} to={pages.Profile.path}>
              {pages.Profile.name}
            </Navbar.Item>
            <Navbar.Item renderAs="div">
              <Button
                onClick={() => {
                  signOut(userDispatch);
                }}
                color="primary"
              >
                Salir
              </Button>
            </Navbar.Item>
          </Navbar.Dropdown>
        </Navbar.Item>
      ) : (
        <Navbar.Item
          renderAs={NavLink}
          to={location => ({
            pathname: pages.SignIn.path,
            state: { from: location }
          })}
        >
          <Button color="primary">{pages.SignIn.name}</Button>
        </Navbar.Item>
      )}
    </>
  );
};

export default Auth;
