import React, { Component, PropTypes } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import Auth from '../../modules/Auth';
import Bar from '../../components/Bar/Bar.jsx';
import Item from '../../components/Bar/Item.jsx';
import s from './LoginPage.scss';

require('es6-promise').polyfill();
require('isomorphic-fetch');


export default class LoginPage extends Component {

  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage'); // eslint-disable-line
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage'); // eslint-disable-line
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
      headers: new Headers({ // eslint-disable-line
        'Content-type': 'application/x-www-form-urlencoded',
      }),
    };

    fetch('/auth/login', fetchInit) // eslint-disable-line
      .then(res => res.json())
      .then((res) => {
        this.setState({ errors: {} });

        Auth.authenticateUser(res.token);

        this.context.router.replace('/');
      })
      .catch((res) => {
        const errors = res.errors ? res.errors : {};
        errors.summary = res.message;

        this.setState({ errors });
      });
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

        <Bar>
          <Item />
        </Bar>

        <LoginForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          successMessage={this.state.successMessage}
          user={this.state.user}
        />

        <Bar bottom>
          <Item to="/signup">Dont have an account?</Item>
        </Bar>
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
