import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Header.css";
import pages from "../../pages";
import { createFilter, categories } from "../../utils/filters";
import { Button, Navbar } from "react-bulma-components";

const Header = () => {
  const [burgerActive, setBurgerActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);
  const onClickBurger = () => setBurgerActive(!burgerActive);
  return (
    <Navbar color="light" active={burgerActive}>
      <Navbar.Brand>
        <Navbar.Item renderAs={Link} to={pages.Home.url}>
          {pages.Home.name}
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
            <Navbar.Link renderAs={NavLink} to={pages.RequestList.url}>
              {pages.RequestList.name}
            </Navbar.Link>
            <Navbar.Dropdown>
              {Object.values(categories).map(category => (
                <Navbar.Item
                  renderAs={NavLink}
                  key={category.name}
                  onClick={() => setDropdownActive(false)}
                  to={{
                    pathname: pages.RequestList.url,
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
          <Navbar.Item renderAs={NavLink} to={pages.RequestCreate.url}>
            {pages.RequestCreate.name}
          </Navbar.Item>
          <Navbar.Item renderAs={NavLink} to={pages.RequestAuditList.url}>
            {pages.RequestAuditList.name}
          </Navbar.Item>
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
