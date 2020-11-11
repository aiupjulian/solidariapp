import React from 'react';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from 'styled-components';

import Routes from './pages/Routes';
import {LoadingProvider} from './contexts/LoadingContext';

const customTheme = createMuiTheme();

const App = () => (
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={customTheme}>
      <ThemeProvider theme={customTheme}>
        <LoadingProvider>
          <CssBaseline />
          <Routes />
        </LoadingProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

export default App;
