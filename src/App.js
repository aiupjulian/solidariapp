import React from 'react';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from 'styled-components';

import Routes from './pages/Routes';
import {JoinModalProvider} from './contexts/JoinModalContext';

let customTheme = createMuiTheme();
customTheme = responsiveFontSizes(customTheme);

const App = () => (
  <StylesProvider injectFirst>
    <MuiThemeProvider theme={customTheme}>
      <ThemeProvider theme={customTheme}>
        <JoinModalProvider>
          <CssBaseline />
          <Routes />
        </JoinModalProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  </StylesProvider>
);

export default App;
