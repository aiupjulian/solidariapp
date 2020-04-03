import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Container, Section } from "react-bulma-components";

import pages from "./";
import { Header } from "../components";
import { useUserState } from "../contexts/UserContext";
import { isAuthorized } from "../utils/roles";

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
  return (
    <Router>
      <Header />
      <Section size="medium">
        <Container>
          <Switch>
            {Object.values(pages).map(props =>
              props.authorization && props.path !== "/sign-in" ? (
                <AuthorizedRoute key={props.path} {...props} />
              ) : (
                <NormalRoute key={props.path} {...props} />
              )
            )}
          </Switch>
        </Container>
      </Section>
    </Router>
  );
};

export default Routes;
