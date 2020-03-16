import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as routeConstants from "../../constants/routes";

const Header = () => {
  const [burgerActive, setBurgerActive] = useState(false);
  const onClickBurger = () => setBurgerActive(!burgerActive);
  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to={routeConstants.HOME} className="navbar-item">
          Home
        </Link>
        <a
          role="button"
          className={`navbar-burger ${burgerActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={onClickBurger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        className={`navbar-menu ${burgerActive ? "is-active" : ""}`}
        id="navMenu"
      >
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link to={routeConstants.PROFILE} className="button is-light">
                Profile
              </Link>
            </div>
          </div>
          <div className="navbar-item">
            <div className="buttons">
              <Link to={routeConstants.LOGIN} className="button is-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
