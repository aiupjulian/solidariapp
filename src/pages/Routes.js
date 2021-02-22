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
import Paper from '@material-ui/core/Paper';

import pages from '.';
import {Header} from '../components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledContainer = styled(Container)`
  flex: 1;
`;

const StyledPaper = styled(Paper)`
  margin-top: ${({theme}) => theme.spacing(5)}px;
  padding: ${({theme}) => theme.spacing(3)}px;
`;

const PageWrapper = ({Component, hasPaperWrapper, ...rest}) => {
  const Page = <Component {...rest} />;
  if (hasPaperWrapper) return <StyledPaper elevation={2}>{Page}</StyledPaper>;
  return Page;
};

const NormalRoute = (props) => (
  <Route>
    <PageWrapper {...props} />
  </Route>
);

const AuthorizedRoute = ({redirect, requiredClaims, ...rest}) => (
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
        <PageWrapper {...rest} />
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
    </AppContainer>
  </Router>
);

export default Routes;
