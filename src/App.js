import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { Header } from "./components";
import pages from "./pages";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Switch>
          {Object.values(pages).map(({ Component, exact, url }) => (
            <Route key={url} component={Component} exact={exact} path={url} />
          ))}
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
