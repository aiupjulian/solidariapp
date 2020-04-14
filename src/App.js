import React from "react";

import "./App.css";
import Routes from "./pages/Routes";
import { UserProvider } from "./contexts/UserContext";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  return (
    <LoadingProvider>
      <UserProvider>
        <Routes />
      </UserProvider>
    </LoadingProvider>
  );
}

export default App;
