import React, { Component, PropTypes } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import Bar from '../../components/Bar/Bar.jsx';
import Item from '../../components/Bar/Item.jsx';
import s from './SignUpPage.scss';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class SignUpPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
        password: '',
      },
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(e) {
    e.preventDefault();

    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`;

    const fetchInit = {
      method: 'POST',
      body: formData,
      headers: new Headers({ // eslint-disable-line
        'Content-type': 'application/x-www-form-urlencoded',
      }),
    };

    fetch('/auth/signup', fetchInit) // eslint-disable-line
      .then(res => res.json())
      .then((res) => {
        if (res.success) {
          this.setState({ errors: {} });

          localStorage.setItem('successMessage', res.message); // eslint-disable-line

          this.context.router.replace('/login');
        }
      })
      .catch((res) => {
        const errors = res.errors ? res.errors : {};
        errors.summary = res.message;
        this.setState({ errors });
      });
  }

  changeUser(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user,
    });
  }

  render() {
    return (
      <div className={s.host}>

        <Bar>
          <Item />
        </Bar>

        <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />

        <Bar bottom>
          <Item to="/login">Already have an account?</Item>
        </Bar>

      </div>
    );
  }
}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
