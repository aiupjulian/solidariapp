import React from "react";
import { StylesProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./App.css";
import Routes from "./pages/Routes";
import { UserProvider } from "./contexts/UserContext";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  return (
    <StylesProvider injectFirst>
      <LoadingProvider>
        <UserProvider>
          <CssBaseline />
          <Routes />
        </UserProvider>
      </LoadingProvider>
    </StylesProvider>
  );
}

export default App;
