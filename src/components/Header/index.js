import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Header.css";
import routes from "../../routes";
import { createFilter, categories } from "../../utils/filters";
import { Button, Navbar } from "react-bulma-components";

const NavbarItem = props => {
  const [active, setActive] = useState(false);
  return (
    <Navbar.Item
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      active={active}
      {...props}
    />
  );
};

const Header = () => {
  const [burgerActive, setBurgerActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const onClickBurger = () => setBurgerActive(!burgerActive);
  return (
    <Navbar color="light" active={burgerActive}>
      <Navbar.Brand>
        <Navbar.Item renderAs={Link} to={routes.Home.url}>
          {routes.Home.name}
        </Navbar.Item>
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
            <Navbar.Link renderAs={NavLink} to={routes.RequestList.url}>
              {routes.RequestList.name}
            </Navbar.Link>
            <Navbar.Dropdown>
              {Object.values(categories).map(category => (
                <Navbar.Item
                  renderAs={NavLink}
                  key={category.name}
                  onClick={() => setDropdownActive(false)}
                  to={{
                    pathname: routes.RequestList.url,
                    search: createFilter({ category: category.url })
                  }}
                  isActive={(_, { search }) =>
                    createFilter({ category: category.url }) === search
                  }
                >
                  {category.name}
                </Navbar.Item>
              ))}
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position="end">
          <NavbarItem renderAs={NavLink} to={routes.RequestCreate.url}>
            {routes.RequestCreate.name}
          </NavbarItem>
          <Navbar.Item renderAs={NavLink} to={routes.RequestAuditList.url}>
            {routes.RequestAuditList.name}
          </Navbar.Item>
          <Navbar.Item renderAs="div">
            <Button renderAs={Link} to={routes.Login.url} color="primary">
              {routes.Login.name}
            </Button>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
};

export default Header;
