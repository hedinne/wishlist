import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SignUpForm from '../../components/SignUpForm/SignUpForm.jsx';
import Top from '../../components/Top/Top.jsx';
import Bottom from '../../components/Bottom/Bottom.jsx';
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
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
      }),
    };

    fetch('/auth/signup', fetchInit)
      .then(res => res.json())
      .then((response) => {
        if (response.success) {
          this.setState({ errors: {} });

          localStorage.setItem('successMessage', response.message);

          this.context.router.replace('/login');
        } else {
          const errors = response.errors ? response.errors : {};
          errors.summary = response.message;
          this.setState({ errors });
        }
      },
    );
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

        <Top>
          <Link to="/" className={s.logo}>
            Wishlist
          </Link>
        </Top>

        <SignUpForm
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
        />

        <Bottom>
          <Link to="/login" className={s.link}>
            Already have an account?
          </Link>
        </Bottom>
      </div>
    );
  }
}

SignUpPage.contextTypes = {
  router: PropTypes.object.isRequired,
};
