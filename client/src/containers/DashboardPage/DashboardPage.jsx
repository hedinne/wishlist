/* eslint no-undef: "off" */
import React, { Component } from 'react';
import qs from 'qs';
import Auth from '../../modules/Auth';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Bar from '../../components/Bar/Bar.jsx';
import Item from '../../components/Bar/Item.jsx';

function postInit(payload) {
  return {
    method: 'POST',
    body: qs.stringify(payload),
    headers: new Headers({
      'Content-type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${Auth.getToken()}`,
    }),
  };
}

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allLists: [],
      newItem: {
        title: '',
        description: '',
        link: '',
        price: '',
        owner: '',
      },
    };

    this.onCreateList = this.onCreateList.bind(this);
    this.onCreateItem = this.onCreateItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onRemoveList = this.onRemoveList.bind(this);
    this.onChangeNewItem = this.onChangeNewItem.bind(this);
  }

  componentDidMount() {
    const getInit = {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: `bearer ${Auth.getToken()}`,
      }),
    };

    fetch('/api/dashboard', getInit)
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

    if (!this.state.newItem.title) { return; }

    try {
      fetch('/api/create/item', postInit(this.state.newItem))
        .then(res => res.json())
        .then(res => res.data)
        .then((res) => {
          if (typeof res[0] !== 'undefined') {
            this.setState({ allLists: res });
          }
        });
      e.target.newItem = {};

    } catch (err) {
      console.error('onCreateItem', err);
    }
  }

  onCreateList(e) {
    e.preventDefault();

    const title = e.target.newName.value;
    if (!title) { return; }

    try {
      fetch('/api/create/list', postInit({ title }))
        .then(res => res.json())
        .then(res => res.data)
        .then((res) => {
          if (typeof res[0] !== 'undefined') {
            this.setState({ allLists: res });
          }
        });
      e.target.newName.value = '';

    } catch (err) {
      console.error('onCreateList', err);
    }
  }

  onRemoveItem(e) {
    e.preventDefault();

    const itemID = e.target.name.split('_')[0];
    const listID = e.target.name.split('_')[1];

    const newList = this.state.allLists;
    newList
      .find(i => i._id === listID)
      .listItems
      .splice(
        newList
          .find(i => i._id === listID)
          .listItems
          .indexOf(
            newList
              .find(i => i._id === listID)
              .listItems
              .find(i => i._id === itemID),
          ),
      1);

    this.setState({ allLists: newList });

    fetch('api/remove/item', postInit({
      item: itemID,
    }))
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

    const newList = this.state.allLists;
    newList.splice(
      newList.indexOf(
        newList.find(i => i._id === listID),
      ),
    1);
    this.setState({ allLists: newList });

    fetch('api/remove/list', postInit({
      item: listID,
    }))
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

  onChangeNewItem(e) {
    e.preventDefault();

    const target = e.target;
    const newItem = this.state.newItem;
    newItem[target.name] = target.value;
    newItem.owner = target.id.split('_')[0];

    this.setState({ newItem });
  }

  render() {
    return (
      <div>
        <Bar>
          <Item to="/logout"><h4>Log Out</h4> </Item>
          <Item logo />
          <Item>
            <form action="/" onSubmit={this.onCreateList} >
              <h4>New List</h4>
              <input type="text" name="newName" />
              <input type="submit" value="Create" />
            </form>
          </Item>
        </Bar>

        <Dashboard
          allLists={this.state.allLists}
          onCreateItem={this.onCreateItem}
          onRemoveItem={this.onRemoveItem}
          onRemoveList={this.onRemoveList}
          onChangeNewItem={this.onChangeNewItem}
        />
      </div>
    );
  }
}
