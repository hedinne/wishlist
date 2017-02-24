import React from 'react';
import ReactDom from 'react-dom';
import injectTaoEventPlugin from 'react-tap-event-plugin';
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';
import './styles/Base.scss';

injectTaoEventPlugin();

ReactDom.render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app') //eslint-disable-line
);
