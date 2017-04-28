/* eslint no-undef: "off" */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import Bar from '../../components/Bar/Bar.jsx';
import Item from '../../components/Bar/Item.jsx';
import s from './SignUpPage.scss';

export default class SignUpPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      push: false,
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
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
      }),
    };

    fetch('/auth/signup', fetchInit).then(res => res.json()).then((response) => {
      if (response.success) {
        this.setState({ errors: {} });

        localStorage.setItem('successMessage', response.message);

        // this.context.router.replace('/signin');
        this.setState({ push: true });
      } else {
        const errors = response.errors ? response.errors : {};
        errors.summary = response.message;
        this.setState({ errors });
      }
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
          <Item logo />
        </Bar>

        <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />

        <div className={s.bottom}>
          <Item to="/login" className={s.item}>
            Already have an account?
          </Item>
        </div>

        {this.state.push && <Redirect push to="/login" />}
      </div>
    );
  }
}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
