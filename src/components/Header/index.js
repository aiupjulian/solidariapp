import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bulma-components";
import { useLocation } from "react-router-dom";

import "./Header.css";
import pages from "../../pages";
import { createFilter, categories } from "../../utils/filters";
import Auth from "./Auth";
import { useUserState } from "../../contexts/UserContext";
import { isAuthorized } from "../../utils/roles";

const NavbarItem = ({ children, page, search, ...props }) => {
  const user = useUserState();
  if (
    page.authorization &&
    !isAuthorized({ user, roles: page.authorization.roles })
  )
    return null;
  return (
    <Navbar.Item renderAs={NavLink} to={page.path} {...props}>
      {children || page.name}
    </Navbar.Item>
  );
};

const Header = () => {
  const { pathname } = useLocation();
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
        <NavbarItem page={pages.Home} exact />
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
            <Navbar.Link
              className={pathname === pages.RequestList.path ? "active" : ""}
            >
              {pages.RequestList.name}
            </Navbar.Link>
            <Navbar.Dropdown boxed>
              {Object.values(categories).map((category) => (
                <NavbarItem
                  key={category.name}
                  onClick={() => setDropdownActive(false)}
                  page={{
                    ...pages.RequestList,
                    name: category.name,
                    path: {
                      pathname: pages.RequestList.path,
                      search: createFilter({ category: category.path }),
                    },
                  }}
                  isActive={(_, { search }) =>
                    createFilter({ category: category.path }) === search
                  }
                />
              ))}
              <Navbar.Divider />
              <NavbarItem
                isActive={(match, { search }) => match && !search}
                page={pages.RequestList}
              >
                Ver todas
              </NavbarItem>
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          <NavbarItem page={pages.RequestCreate} />
          <NavbarItem page={pages.RequestAuditList} />
          <Auth />
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Header;
