import React, { Component } from 'react';
import SignUpForm from '../components/SignUpForm.jsx';

export default class SignUpPage extends Component {

  constructor(props) {
    super(props);

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

  changeUser(e) {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user,
    });
  }

  processForm(e) {
    e.preventDefault();

    console.log('name: ', this.state.user.name);
    console.log('email: ', this.state.email.name);
    console.log('password: ', this.state.password.name);
  }

  render() {
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}
