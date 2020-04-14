import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Section } from "react-bulma-components";

import pages from ".";
import { Header, Spinner } from "../components";
import { useUserState } from "../contexts/UserContext";
import { useLoadingState } from "../contexts/LoadingContext";
import { isAuthorized } from "../utils/roles";
import "./Routes.css";

const NormalRoute = ({ Component, ...rest }) => (
  <Route>
    <Component {...rest} />
  </Route>
);

const AuthorizedRoute = ({ Component, authorization, ...rest }) => {
  const user = useUserState();
  return (
    <Route
      render={({ location }) =>
        isAuthorized({ user, roles: authorization.roles }) ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: authorization.redirect,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const user = useUserState();
  const isLoading = useLoadingState();
  return (
    <Router>
      <Header />
      {(user.isLoading || isLoading) && (
        <div className="SpinnerContainer">
          <Spinner className="Spinner" />
        </div>
      )}
      <Section>
        <Switch>
          {Object.values(pages).map(props =>
            props.authorization ? (
              <AuthorizedRoute key={props.path} {...props} />
            ) : (
              <NormalRoute key={props.path} {...props} />
            )
          )}
        </Switch>
      </Section>
    </Router>
  );
};

export default Routes;
