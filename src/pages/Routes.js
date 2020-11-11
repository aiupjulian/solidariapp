import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {AuthCheck} from 'reactfire';

import Container from '@material-ui/core/Container';

import pages from '.';
import {Header} from '../components';

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
    <Header />
    <Container fixed>
      <Switch>
        {Object.values(pages).map((props) =>
          props.redirect ? (
            <AuthorizedRoute key={props.path} {...props} />
          ) : (
            <NormalRoute key={props.path} {...props} />
          ),
        )}
      </Switch>
    </Container>
  </Router>
);

export default Routes;
