/* eslint no-undef: "off" */

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
    this.onCreateItem = this.onCreateItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onRemoveList = this.onRemoveList.bind(this);
  }

  componentDidMount() {
    const fetchInit = {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`,
      }),
    };

    fetch('/api/dashboard', fetchInit)
      .then(res => res.json())
      .then(res => res.data)
      .then((res) => {
        const temp = [];
        res.map(i => temp.push(i));
        this.setState({
          allLists: temp,
        });
      });
  }

  onCreateItem(e) {
    e.preventDefault();

    const fetchInit = {
      method: 'POST',
      body: qs.stringify({
        title: e.target.newItem.value,
        owner: e.target.id,
      }),
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`,
      }),
    };
    fetch('/api/create/item', fetchInit)
      .then(res => res.json())
      .then(res => res.data)
      .then((res) => {
        const temp = [];
        res.map(i => temp.push(i));
        this.setState({
          allLists: temp,
        });
      });
    e.target.newItem.value = '';
  }

  onCreateList(e) {
    e.preventDefault();

    const fetchInit = {
      method: 'POST',
      body: qs.stringify({ title: e.target.newName.value }),
      headers: new Headers({ // eslint-disable-line
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`,
      }),
    };
    fetch('/api/create/list', fetchInit)
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

  onRemoveItem(e) {
    e.preventDefault();

    const itemID = e.target.name.split('_')[0];
    const listID = e.target.name.split('_')[1];

    const temp = this.state.allLists;
    temp
      .find(i => i._id === listID)
      .listItems
      .splice(
        temp
          .find(i => i._id === listID)
          .listItems
          .indexOf(
            temp
              .find(i => i._id === listID)
              .listItems
              .find(i => i._id === itemID),
          ),
      1);

    this.setState({ allLists: temp });

    const fetchInit = {
      method: 'POST',
      body: qs.stringify({ item: itemID }),
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`,
      }),
    };
    fetch('api/remove/item', fetchInit)
      .then(res => res.json())
      .then(res => res.data)
      .then((res) => {
        const tempI = [];
        res.map(i => tempI.push(i));
        this.setState({
          allLists: tempI,
        });
      });
  }

  onRemoveList(e) {
    e.preventDefault();

    const listID = e.target.name;

    const temp = this.state.allLists;
    temp.splice(
      temp.indexOf(
        temp.find(i => i._id === listID),
      ),
    1);
    this.setState({ allLists: temp });

    const fetchInit = {
      method: 'POST',
      body: qs.stringify({ item: listID }),
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`,
      }),
    };
    fetch('api/remove/list', fetchInit)
      .then(res => res.json())
      .then(res => res.data)
      .then((res) => {
        const tempI = [];
        res.map(i => tempI.push(i));
        this.setState({
          allLists: tempI,
        });
      });
  }


  render() {
    return (
      <Dashboard
        allLists={this.state.allLists}
        onCreateList={this.onCreateList}
        onCreateItem={this.onCreateItem}
        onRemoveItem={this.onRemoveItem}
        onRemoveList={this.onRemoveList}
      />
    );
  }
}
