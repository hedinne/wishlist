import React from 'react';
import ReactDom from 'react-dom';
import injectTaoEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';

injectTaoEventPlugin();

ReactDom.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>,
  document.getElementById('react-app') //eslint-disable-line
);
