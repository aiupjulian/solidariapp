import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Container, Section } from "react-bulma-components";

import pages from ".";
import { Header, Spinner } from "../components";
import { useUserState } from "../contexts/UserContext";
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
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  const user = useUserState();
  return (
    <Router>
      <Header />
      {user.isLoading ? (
        <div className="SpinnerContainer">
          <Spinner className="Spinner" />
        </div>
      ) : (
        <Section size="medium">
          <Container>
            <Switch>
              {Object.values(pages).map((props) =>
                props.authorization ? (
                  <AuthorizedRoute key={props.path} {...props} />
                ) : (
                  <NormalRoute key={props.path} {...props} />
                )
              )}
            </Switch>
          </Container>
        </Section>
      )}
    </Router>
  );
};

export default Routes;
