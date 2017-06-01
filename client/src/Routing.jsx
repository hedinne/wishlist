import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import HomePage from './containers/HomePage/HomePage.jsx';
import LoginPage from './containers/LoginPage/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage/SignUpPage.jsx';
import DashboardPage from './containers/DashboardPage/DashboardPage.jsx';
import OpenListPage from './containers/OpenListPage/OpenListPage.jsx';
import Auth from './modules/Auth';
import './styles/Base.scss';

const logOut = () => (
  <div>
    {Auth.deauthenticateUser()}
    <Redirect to="/" />
  </div>
);

export default class Routing extends Component {
  render() {
    return (
      <Router>
        <Switch>

          <Route
            exact
            path="/"
            render={() =>
              Auth.isUserAuthenticated()
                ? <Route component={DashboardPage} />
                : <Route component={HomePage} />}
          />

          <Route exact path="/register" component={SignUpPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={logOut} />

          <Route exact path="/list/:id" component={OpenListPage} />

          <Route render={() => <h1><Link to="/">404: Page not found</Link></h1>} />

        </Switch>
      </Router>
    );
  }
}
