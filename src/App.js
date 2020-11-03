import React from "react";
import "./App.css";

import Routes from "./pages/Routes";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <Routes />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
