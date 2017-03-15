/* eslint react/react-in-jsx-scope: 0 */
/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory, Redirect } from 'react-router';
import injectTaoEventPlugin from 'react-tap-event-plugin';

import Base from './containers/Base/Base.jsx';
import HomePage from './containers/HomePage/HomePage.jsx';
import LoginPage from './containers/LoginPage/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage/SignUpPage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import Auth from './modules/Auth';
import './styles/Base.scss';

injectTaoEventPlugin();

const startPage = [
  {
    path: '/',
    getComponent: (location, callback) => {
      if (Auth.isUserAuthenticated()) {
        callback(null, DashboardPage);
      } else {
        callback(null, HomePage);
      }
    },
  },
];

const logout = (nextState, replace) => {
  Auth.deauthenticateUser();

  replace('/');
};

ReactDom.render((
  <Router history={browserHistory} HistoryLocation>

    <Route component={Base} childRoutes={startPage} />

    <Route path="/register" component={SignUpPage} />
    <Route path="/signin" component={LoginPage} />

    <Route path="/signout" onEnter={logout} />

    <Redirect from="*" to="/" />
  </Router>
), document.getElementById('app')); // eslint-disable-line
