import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bulma-components";

import "./Header.css";
import pages from "../../pages";
import { createFilter, categories } from "../../utils/filters";
import Auth from "./Auth";
import { useUserState } from "../../contexts/UserContext";

const NavbarItem = ({ to, name, ...props }) => (
  <Navbar.Item renderAs={NavLink} to={to} {...props}>
    {name}
  </Navbar.Item>
);

const Header = () => {
  const { isAuthenticated } = useUserState();
  const [burgerActive, setBurgerActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const onClickBurger = () => setBurgerActive(!burgerActive);
  return (
    <Navbar
      color="light"
      transparent
      active={burgerActive}
      className="headerContainer"
    >
      <Navbar.Brand>
        <NavbarItem to={pages.Home.path} name={pages.Home.name} exact />
        <Navbar.Burger onClick={onClickBurger} />
      </Navbar.Brand>
      <Navbar.Menu onClick={() => setBurgerActive(false)}>
        <Navbar.Container>
          <Navbar.Item
            dropdown
            active={dropdownActive}
            onMouseEnter={() => setDropdownActive(true)}
            onMouseLeave={() => setDropdownActive(false)}
          >
            <Navbar.Link renderAs={NavLink} to={pages.RequestList.path}>
              {pages.RequestList.name}
            </Navbar.Link>
            <Navbar.Dropdown boxed>
              {Object.values(categories).map(category => (
                <NavbarItem
                  key={category.name}
                  onClick={() => setDropdownActive(false)}
                  to={{
                    pathname: pages.RequestList.path,
                    search: createFilter({ category: category.path })
                  }}
                  isActive={(_, { search }) =>
                    createFilter({ category: category.path }) === search
                  }
                  name={category.name}
                />
              ))}
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          {isAuthenticated && (
            <>
              <NavbarItem
                to={pages.RequestCreate.path}
                name={pages.RequestCreate.name}
              />
              <NavbarItem
                to={pages.RequestAuditList.path}
                name={pages.RequestAuditList.name}
              />
            </>
          )}
          <Auth />
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Header;
