import React, { Component } from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard/Dashboard.jsx';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
    };
  }

  componentDidMount() {

    const fetchInit = {
      method: 'GET',
      headers: new Headers({ // eslint-disable-line
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`,
      }),
    };

    fetch('/api/dashboard', fetchInit) // eslint-disable-line
      .then(res => res.json())
      .then((res) => {
        this.setState({
          secretData: res.message,
        });
      })
      .catch(console.log('secretData 💩'));
  }

  render() {
    return (<Dashboard secretData={this.state.secretData} />);
  }
}
