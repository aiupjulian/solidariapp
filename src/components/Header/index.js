import React from "react";
import styled from "styled-components";
import { LogoSimple, Menu } from "../../assets/icons";
import Button from "../Button";
import useIsDesktop from "../../hooks/useIsDesktop";

import pages from "../../pages";
import { createSearch, categories, FILTERS } from "../../utils/filters";
// import { isAuthorized } from "../../utils/roles";

const Header = () => {
  const isDesktop = useIsDesktop();
  const userActions = (
    <Actions>
      <StyledButton>Log in</StyledButton>
      <Button variant="secondaryWhite">Register</Button>
    </Actions>
  );
  const links = (
    <ul>
      <li>Home</li>
      <li>Test</li>
    </ul>
  );
  return (
    <Navbar>
      {isDesktop ? (
        <DesktopNav>
          <DesktopLeft>
            <Logo />
            {links}
          </DesktopLeft>
          {userActions}
        </DesktopNav>
      ) : (
        <MobileNav>
          <StyledMenu />
          <LogoContent>
            <h2>Solidariapp</h2>
            <Logo />
          </LogoContent>
        </MobileNav>
      )}
    </Navbar>
  );
};

export default Header;

const Navbar = styled.nav`
  position: fixed;
  box-sizing: border-box;
  z-index: 1;
  color: white;
  width: 100vw;
`;

const Actions = styled.div``;

const StyledButton = styled(Button)`
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const Logo = styled(LogoSimple)`
  width: 36px;
  height: 36px;
  fill: white;
`;

const DesktopNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing.md};
`;

const MobileNav = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.md};
  width: 100%;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const StyledMenu = styled(Menu)`
  width: 24px;
  height: 24px;
  color: white;
`;

const LogoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    width: 36px;
    height: 36px;
  }
  > h2 {
    margin: 0;
    color: white;
    padding-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const DesktopLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > ul {
    display: flex;
    margin: 0;
    padding: 0;
  }
  > ul > li {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;
