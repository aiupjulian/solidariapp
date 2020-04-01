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

const NormalRoute = ({ Component, ...rest }) => (
  <Route>
    <Component {...rest} />
  </Route>
);

const PrivateRoute = ({ Component, ...rest }) => {
  const state = useUserState();
  return (
    <Route
      render={({ location }) =>
        state.isAuthenticated ? (
          <Component {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: pages.SignIn.path,
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
              props.protected ? (
                <PrivateRoute key={props.path} {...props} />
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
