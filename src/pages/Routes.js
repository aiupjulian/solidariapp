import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
  flex: 1;
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

const Routes = () => (
  <Router>
    <AppContainer>
      <Header />
      <StyledContainer fixed>
        <Switch>
          {Object.values(pages).map((props) =>
            props.redirect ? (
              <AuthorizedRoute key={props.path} {...props} />
            ) : (
              <NormalRoute key={props.path} {...props} />
            ),
          )}
        </Switch>
      </StyledContainer>
      <Footer />
    </AppContainer>
  </Router>
);

export default Routes;
