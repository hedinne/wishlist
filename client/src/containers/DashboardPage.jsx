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
      allLists: [],
    };

    this.onCreateList = this.onCreateList.bind(this);
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
      // .then(res => console.log(res));
      .then(res => res.data)
      .then((res) => {
        const temp = this.state.allLists;
        res.map(i => temp.push(i));
        this.setState({
          allLists: temp,
        });
      });
  }

  onCreateList(e) {
    e.preventDefault();

    const fetchInit = {
      method: 'POST',
      body: qs.stringify({ value: e.target.newName.value }),
      headers: new Headers({ // eslint-disable-line
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`,
      }),
    };
    fetch('/api/create/list', fetchInit) // eslint-disable-line
      .then(res => res.json())
      .then(res => res.data)
      .then((res) => {
        const temp = [];
        res.map(i => temp.push(i));
        this.setState({
          allLists: temp,
        });
      });
    e.target.newName.value = '';
  }


  render() {
    return (
      <Dashboard
        allLists={this.state.allLists}
        onCreateList={this.onCreateList}
      />
    );
  }
}
