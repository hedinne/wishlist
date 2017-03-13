import React, { Component } from 'react';
import qs from 'qs';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard/Dashboard.jsx';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      allLists: {},
    };

    this.sendItem = this.sendItem.bind(this);
    this.newItem = this.newItem.bind(this);
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
      .then(response => response.json())
      .then((response) => {
        if (response.message) {
          this.setState({
            secretData: response.message,
            list: response.list,
          });
        } else {
          console.log('Error í svari');
        }
      });
  }

  sendItem(e) {
    e.preventDefault();

    const fetchInit = {
      method: 'POST',
      body: qs.stringify(this.state.newItem),
      headers: new Headers({ // eslint-disable-line
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`,
      }),
    };

    fetch('/api/dashboard/items', fetchInit) //eslint-disable-line
      .then(res => console.log(res));
  }

  newItem(e) {
    // const nw = this.State.newItem;
    // console.log(nw);
    // console.log(e.target.value);
    // this.setState({
    //   nw,
    // });
  }


  render() {
    return (
      <Dashboard
        secretData={this.state.secretData}
        list={this.state.list}
        onSubmit={this.sendItem}
        onChange={this.newItem}
      />
    );
  }
}
