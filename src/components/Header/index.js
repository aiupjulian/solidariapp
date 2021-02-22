import React, {useMemo} from 'react';
import styled from 'styled-components';
import {AuthCheck} from 'reactfire';
import {Link as RouterLink, useLocation} from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';

import Auth from './components/Auth';
import {LogoSimple} from '../../assets/icons';
import pages from '../../pages';

const MenuButton = styled(IconButton)`
  margin-right: ${({theme}) => theme.spacing(2)}px;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({theme}) => theme.palette.primary.contrastText};
  margin-right: ${({theme}) => theme.spacing(2)}px;
`;

const Logo = styled(LogoSimple)`
  width: 30px;
  height: 30px;
  fill: white;
`;

const Title = styled(Typography)`
  flex-grow: 1;
`;

const StyledTab = styled(Tab)`
  min-width: unset;
`;

const Separator = styled.div`
  flex-grow: 1;
`;

const LinkTab = ({page}) => {
  const Tab = (
    <StyledTab component={RouterLink} to={page.path} label={page.name} />
  );
  if (page.redirect) {
    return <AuthCheck requiredClaims={page.claim}>{Tab}</AuthCheck>;
  }
  return Tab;
};

const Header = () => {
  const location = useLocation();
  const headerPages = useMemo(
    () => [pages.PostList, pages.TopUsers, pages.PostAuditList],
    [],
  );
  const tabsValue = useMemo(() => {
    const currentPage = headerPages.find(
      (headerPage) => headerPage.path === location.pathname,
    );
    return currentPage?.path || false;
  }, [location, headerPages]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Hidden smUp>
            <MenuButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </MenuButton>
          </Hidden>
          <StyledLink component={RouterLink} to="/">
            <Logo />
            <Title variant="h6">Solidariapp</Title>
          </StyledLink>
          <Hidden smDown>
            <Tabs value={tabsValue} aria-label="nav tabs">
              {headerPages.map((headerPage) => (
                <LinkTab
                  key={headerPage.path}
                  value={headerPage.path}
                  page={headerPage}
                />
              ))}
            </Tabs>
          </Hidden>
          <Separator />
          <Auth />
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
    </>
  );
};

export default Header;
