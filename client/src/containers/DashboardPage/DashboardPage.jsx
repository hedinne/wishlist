/* eslint no-undef: "off" */
/* eslint max-len: "off" */
import React, { Component } from 'react';
import qs from 'qs';
import Auth from '../../modules/Auth';
import Dashboard from '../../components/Dashboard/Dashboard.jsx';
import Bar from '../../components/Bar/Bar.jsx';
import Item from '../../components/Bar/Item.jsx';
import s from './DashboardPage.scss';

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
      showNewList: false,
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
    this.onClickShowNewList = this.onClickShowNewList.bind(this);
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
      e.target.reset();

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

    console.log(e.currentTarget.id);

    console.log('itemID', e.currentTarget.id.split('_')[0]);
    console.log('listID', e.currentTarget.id.split('_')[1]);

    const itemID = e.currentTarget.id.split('_')[0];
    const listID = e.currentTarget.id.split('_')[1];

    const newList = this.state.allLists;
    console.log(newList);
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

    const listID = e.currentTarget.id.split('_')[1];

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

  onClickShowNewList() {
    this.setState({
      showNewList: !this.state.showNewList,
    });
  }

  render() {
    return (
      <div>
        <Bar>
          <Item to="/logout" className={s.headerItem}>Log Out</Item>
          <Item logo />
          <Item>
            <button
              className={s('newListButton', { 'newListButton--open': this.state.showNewList })}
              onClick={this.onClickShowNewList}
            >
              New List
            </button>
            {this.state.showNewList &&
              <form action="/" onSubmit={this.onCreateList} className={s.form} >
                <input type="text" name="newName" className={s.input} />
                <button type="submit" className={s.inputButton}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="#ddd"
                      d="M12 2q0.414 0 0.707 0.293t0.293 0.707v8h8q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-8v8q0 0.414-0.293 0.707t-0.707 0.293-0.707-0.293-0.293-0.707v-8h-8q-0.414 0-0.707-0.293t-0.293-0.707 0.293-0.707 0.707-0.293h8v-8q0-0.414 0.293-0.707t0.707-0.293z"
                    />
                  </svg>
                </button>
              </form>
            }
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
