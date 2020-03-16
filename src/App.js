import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import { Home, Login, Profile } from "./pages";
import * as routeConstants from "./constants/routes";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={routeConstants.LOGIN}>
          <Login />
        </Route>
        <Route path={routeConstants.PROFILE}>
          <Profile />
        </Route>
        <Route path={routeConstants.HOME}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
