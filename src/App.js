import React from 'react';

import Routes from './pages/Routes';
import {LoadingProvider} from './contexts/LoadingContext';
import {ThemeProvider} from 'styled-components';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <LoadingProvider>
      <Routes />
    </LoadingProvider>
  </ThemeProvider>
);

export default App;
