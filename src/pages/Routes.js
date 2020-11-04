import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import pages from '.';
import {Header, Spinner} from '../components';
import {useLoadingState} from '../contexts/LoadingContext';
import {isAuthorized} from '../utils/roles';
import './Routes.css';

const NormalRoute = ({Component, ...rest}) => (
  <Route>
    <Component {...rest} />
  </Route>
);

const AuthorizedRoute = ({Component, authorization, ...rest}) => {
  return (
    <Route
      render={({location}) =>
        isAuthorized({roles: authorization.roles}) ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: authorization.redirect,
              state: {from: location},
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const isLoading = useLoadingState();
  return (
    <Router>
      <Header />
      {/* {isLoading && (
        <div className="SpinnerContainer">
          <Spinner className="Spinner" />
        </div>
      )} */}
      <>
        <Switch>
          {Object.values(pages).map((props) =>
            props.authorization ? (
              <AuthorizedRoute key={props.path} {...props} />
            ) : (
              <NormalRoute key={props.path} {...props} />
            ),
          )}
        </Switch>
      </>
    </Router>
  );
};

export default Routes;
