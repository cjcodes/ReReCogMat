import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './styles/rise.css';
import * as colors from './styles/colors';

const store = configureStore();

const secondary = colors.bluesky;

const theme = createMuiTheme({
  drawerWidth: 240,
  palette: {
    primary: colors.pine,
    secondary: {
      ...secondary,
      A100: secondary['200'],
      A200: secondary['400'],
      A400: secondary['800'],
      A700: secondary['900'],
    },
    grey: colors.granite,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>
, document.getElementById('root'));

registerServiceWorker();
