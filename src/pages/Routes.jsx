import React, {Suspense, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import {AuthCheck} from 'reactfire';
import styled from 'styled-components';

import Container from '@material-ui/core/Container';

import pages from '.';
import {Footer, Header} from '../components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled(Container)`
  margin-top: ${({theme}) => theme.spacing(4)}px;
  margin-bottom: ${({theme}) => theme.spacing(2)}px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const NormalRoute = ({Component, ...rest}) => (
  <Route>
    <Component {...rest} />
  </Route>
);

const AuthorizedRoute = ({Component, redirect, requiredClaims, ...rest}) => (
  <Route
    render={({location}) => (
      <AuthCheck
        requiredClaims={requiredClaims}
        fallback={
          <Redirect
            to={{
              pathname: redirect,
              state: {from: location},
            }}
          />
        }
      >
        <Component {...rest} />
      </AuthCheck>
    )}
  />
);

const ScrollToTop = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Routes = () => (
  <Router>
    <ScrollToTop />
    <AppContainer>
      <Header />
      <StyledContainer fixed>
        <Suspense fallback={<></>}>
          <Switch>
            {Object.values(pages).map((props) =>
              props.redirect ? (
                <AuthorizedRoute key={props.path} {...props} />
              ) : (
                <NormalRoute key={props.path} {...props} />
              ),
            )}
          </Switch>
        </Suspense>
      </StyledContainer>
      <Footer />
    </AppContainer>
  </Router>
);

export default Routes;
