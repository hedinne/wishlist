import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import Auth from '../../modules/Auth';
import Top from '../../components/Top/Top.jsx';
import Bottom from '../../components/Bottom/Bottom.jsx';
import s from './LoginPage.scss';

require('es6-promise').polyfill();
require('isomorphic-fetch');


export default class LoginPage extends Component {

  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(e) {
    e.preventDefault();

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    const fetchInit = {
      method: 'POST',
      body: formData,
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
      }),
    };

    fetch('/auth/login', fetchInit)
      .then(res => res.json())
      .then((response) => {
        if (response.success) {
          this.setState({ errors: {} });

          Auth.authenticateUser(response.token);

          this.context.router.replace('/');
        } else {
          const errors = response.errors ? response.errors : {};
          errors.summary = response.message;

          this.setState({ errors });
        }
      },
    );
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({ user });
  }

  render() {
    return (
      <div className={s.host}>

        <Top >
          <Link to="/" className={s.logo}>
            Wishlist
          </Link>
        </Top>

        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          successMessage={this.state.successMessage}
          user={this.state.user}
        />

        <Bottom>
          <Link to="/signup" className={s.link}>
            Dont have an account?
          </Link>
        </Bottom>
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
