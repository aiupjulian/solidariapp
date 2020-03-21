import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Header.css";
import pages from "../../pages";
import { createFilter, categories } from "../../utils/filters";
import { Button, Navbar } from "react-bulma-components";

const NavbarItem = ({ to, name, ...props }) => (
  <Navbar.Item renderAs={NavLink} to={to} {...props}>
    {name}
  </Navbar.Item>
);

const Header = () => {
  const [burgerActive, setBurgerActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const onClickBurger = () => setBurgerActive(!burgerActive);
  return (
    <Navbar color="light" transparent active={burgerActive}>
      <Navbar.Brand>
        <NavbarItem to={pages.Home.url} name={pages.Home.name} exact />
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
            <Navbar.Link renderAs={NavLink} to={pages.RequestList.url}>
              {pages.RequestList.name}
            </Navbar.Link>
            <Navbar.Dropdown>
              {Object.values(categories).map(category => (
                <NavbarItem
                  key={category.name}
                  onClick={() => setDropdownActive(false)}
                  to={{
                    pathname: pages.RequestList.url,
                    search: createFilter({ category: category.url })
                  }}
                  isActive={(_, { search }) =>
                    createFilter({ category: category.url }) === search
                  }
                  name={category.name}
                />
              ))}
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          <NavbarItem
            to={pages.RequestCreate.url}
            name={pages.RequestCreate.name}
          />
          <NavbarItem
            to={pages.RequestAuditList.url}
            name={pages.RequestAuditList.name}
          />
          <Navbar.Item renderAs="div">
            <Button renderAs={Link} to={pages.Login.url} color="primary">
              {pages.Login.name}
            </Button>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Header;
