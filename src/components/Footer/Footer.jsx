import React from 'react';
import styled from 'styled-components';
import {Link as RouterLink} from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import pages from '../../pages';

const StyledBox = styled(Box)`
  padding: ${({theme}) => theme.spacing(6)}px 0;
  color: ${({theme}) => theme.palette.primary.contrastText};
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  ${({theme}) => theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;

const Sitemap = styled.div`
  display: flex;
  flex-direction: column;
  a {
    margin-bottom: ${({theme}) => theme.spacing(2)}px;
  }
  ${({theme}) => theme.breakpoints.up('sm')} {
    a:last-child {
      margin-bottom: 0;
    }
  }
`;

const Name = styled.div``;

const Footer = () => (
  <StyledBox bgcolor="text.secondary">
    <StyledContainer>
      <Sitemap>
        <Link component={RouterLink} to={pages.Home.path} color="inherit">
          {pages.Home.name}
        </Link>
        <Link component={RouterLink} to={pages.PostList.path} color="inherit">
          {pages.PostList.name}
        </Link>
        <Link component={RouterLink} to={pages.TopUsers.path} color="inherit">
          {pages.TopUsers.name}
        </Link>
      </Sitemap>
      <Name>© 2021 Solidariapp</Name>
    </StyledContainer>
  </StyledBox>
);

export default Footer;
