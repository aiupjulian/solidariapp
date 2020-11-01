import React from "react";
// https://www.flaticon.com/packs/charity-145?word=charity
import "./App.css";
import Routes from "./pages/Routes";
import { UserProvider } from "./contexts/UserContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
