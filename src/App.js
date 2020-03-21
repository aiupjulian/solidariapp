import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import pages from "./pages";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        {Object.values(pages).map(({ Component, exact, url }) => (
          <Route key={url} component={Component} exact={exact} path={url} />
        ))}
      </Switch>
    </Router>
  );
}

export default App;
